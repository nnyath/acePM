import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  Image
} from 'react-native';
import { connect } from 'react-redux';

import update from 'immutability-helper'
import styles from './styles'
import {_wait} from '../../util/tests/testutil'
import {initLoad} from './actions'
import consts from '../../util/consts'

@connect(store => {
  return {
    init : store.main.init
  }
})
export default class Splash extends Component {

  constructor() {
    super()
    this.state = {
      info:'Loading',
      timeout: 1000,
      ellipses : {
        rate : 500,
        handler : null,
        display: ''
      }
    }

    this.startEllipses = this.startEllipses.bind(this)
    this.stopEllipses = this.stopEllipses.bind(this)
    this.simulateLoading = this.simulateLoading.bind(this)
    this.iterateMsg = this.iterateMsg.bind(this)
  }

  componentDidMount(){
      this.simulateLoading(consts.UI.LOADING_MESSAGES, 10, this.state.timeout)
  }

  async simulateLoading(loadingMsgs,displayCount, timeout){
        
    this.startEllipses()

    try{
      await this.iterateMsg(loadingMsgs,displayCount, timeout)
    }catch(err){
      console.warn(err)
    }
    
    this.stopEllipses()
    this.props.dispatch(initLoad())
  }

  startEllipses(){
    return this.setState(
      update(this.state, { ellipses: { handler: { $set: setInterval(()=>{
        this.setState(update(this.state, {ellipses:{display:{$set: this.state.ellipses.display.length > 2 ? '.' : this.state.ellipses.display+'.' }}}))
      },this.state.ellipses.rate) } } })
    )
  }

  async stopEllipses(){
    clearInterval(this.state.ellipses.handler)
    return await this.setState(update(this.state, { ellipses: { display: { $set: '' }, handler: { $set: null } } }))
  }

  /* Unpure (setState side-effect) recursive helper function to wait and iterate through loading messages*/
  iterateMsg = async (msgs, count, timeout) => {
    
    if(!Array.isArray(msgs))
      throw new Error('Invalid loading messages')
    
    if(count<=0)
      return msgs === [] ? [] : msgs
    
      
    if(count>msgs.length){
      console.warn('Cannot display more messages than what exists, defaulting to messages.length')
      return await this.iterateMsg(msgs,msgs.length,timeout)
    }

    if(msgs.length==0){
      throw new Error('Invalid loading messages')
    }

    await _wait(timeout)
    const randInd = Math.floor(Math.random()*msgs.length)
    await this.setState(update(this.state, {info:{$set:msgs[randInd]}}))
    return await this.iterateMsg(update(msgs,{$splice:[[randInd,1]]}),count-1,timeout)
  }

  render() {

    const {info, ellipses} = this.state

    return (
      <View style={styles.container}>
        <View style={styles.img}>
          <Image style={styles.logo}
            source={require('../../../media/img/acePM_redux.png')}>
          </Image>
          <Text style={styles.info}>{info}{ellipses.display}</Text>
        </View>
      </View>
    );
  }
}


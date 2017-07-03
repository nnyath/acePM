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
      ellipses : {
        rate : 500,
        handler : null,
        display: ''
      }
    }

    this.startEllipses = this.startEllipses.bind(this)
    this.stopEllipses = this.stopEllipses.bind(this)

    this.simulateLoading = this.simulateLoading.bind(this)
  }

  componentDidMount(){
      this.simulateLoading(3)
  }

  async simulateLoading(displayCount){
    /* Pure recursive helper function to wait and iterate through loading messages*/
    iterateMsg = async (msgs, count) => {
      if(count<=0)
        return

      await _wait(5000)
      const randInd = Math.floor(Math.random()*msgs.length)
      await this.setState(update(this.state, {info:{$set:msgs[randInd]}}))
      await iterateMsg(update(msgs,{$splice:[[randInd,1]]}),count-1)
    }
    
    this.startEllipses()
    await iterateMsg(consts.UI.LOADING_MESSAGES,displayCount)
    this.stopEllipses()
    
    this.props.dispatch(initLoad())
  }

  startEllipses(){
    this.setState(
      update(this.state, { ellipses: { handler: { $set: setInterval(()=>{
        this.setState(update(this.state, {ellipses:{display:{$set: this.state.ellipses.display.length > 2 ? '' : this.state.ellipses.display+'.' }}}))
      },this.state.ellipses.rate) } } })
    )
  }

  stopEllipses(){
    clearInterval(this.state.ellipses.handler)
    this.setState(update(this.state, { ellipses: { display: { $set: '' }, handler: { $set: null } } }))
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


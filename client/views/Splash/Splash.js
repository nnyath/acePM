import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  Image
} from 'react-native';

import update from 'immutability-helper'
import styles from './styles'
import {_wait} from '../../util/tests/testutil'

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
  }

  async componentDidMount(){
    this.startEllipses()
    await _wait(5000)
    await this.setState(update(this.state, {info:{$set:'Connecting to Server'}}))
    await _wait(5000)
    await this.setState(update(this.state, {info:{$set:'Calibrating 16th Notes'}}))
    await _wait(5000)
    await this.setState(update(this.state, {info:{$set:'Mapping Crossovers'}}))
    await _wait(20000)
    this.stopEllipses()
    
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
            source={require('../../media/img/acePM_redux.png')}
          >
          </Image>
          <Text style={styles.info}>{info}{ellipses.display}</Text>
        </View>
      </View>
    );
  }
}


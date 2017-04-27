'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';


export default class header extends Component {

  render(){
    return (
      <View style={styles.header}>
        <View style={styles.header_item}>
          <Text style={styles.header_text}>{this.props.text}</Text>
        </View>
      </View>
    );
  }


}

const styles = StyleSheet.create({
  header: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    height: 56,
    backgroundColor: '#2fa8a4',
  },
  header_item: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  header_text: {
    color: 'white',
    fontSize: 18
  }
});

AppRegistry.registerComponent('header', () => header);

'use strict';
import React, {
  StyleSheet
} from 'react-native';
import Dimensions from 'Dimensions';

const DEVICE_WIDTH = Dimensions.get('window').width;

module.exports = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    flex: 1
  },
  container1: {
		flex: 1,
		alignItems: 'center',
	},
  body: {
    flex: 9,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
  },
  
  toolbar: {
        height: 56,
        backgroundColor: '#2fa8a4',
  },

  textInput: {
    height: 40,
    width: 200,
    color: 'black'
  },
  transparentButton: {
    marginTop: 10,
    padding: 15,
  },
  transparentButtonText: {
    color: '#2fa8a4',
    textAlign: 'center',
    fontSize: 16
  },
  primaryButton: {
    alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#2fa8a4',
		borderRadius: 20,
		zIndex: 100,
    width: DEVICE_WIDTH - 40,
		height: 40,
		marginHorizontal: 20,
		paddingLeft: 45,
  },
  primaryButton2:{
    alignItems: 'center',
		justifyContent: 'center',
    backgroundColor: '#2fa8a4',
    height: 40,
  },
  primaryButtonText2: {
    color: 'black',
    textAlign: 'center',
    fontSize: 18
  },
  primaryButtonText: {
    color: '#FFF',
    textAlign: 'center',
    paddingRight: 45,
    fontSize: 18
  },
  image: {
    width: 100,
    height: 100
  }
});

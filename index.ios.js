/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 import React, { Component } from 'react';
 import {
   AppRegistry,
   StyleSheet,
   Navigator,
   Text,
   View
 } from 'react-native';

 import Signup from './src/pages/signup';
 import * as firebase from 'firebase';

  const firebaseConfig = {
      apiKey: "AIzaSyAgZZXmaXGEuxcpPZStBDn4NYmmks_Dujs",
      authDomain: "mobile-app-tutor.firebaseapp.com",
      databaseURL: "https://mobile-app-tutor.firebaseio.com",
      storageBucket: "mobile-app-tutor.appspot.com",
      messagingSenderId: "98566893329"
  };
 const firebaseApp = firebase.initializeApp(firebaseConfig);
 import Login from './src/pages/Login-ios';
 class rnfirebaseauth extends Component {
   render() {
     return (
       // For now our navigator will always take us to the login page.
       // We will use a transition where the new page will slide in from the right.
       <Navigator
         initialRoute={{component: Login}}
         configureScene={() => {
           return Navigator.SceneConfigs.FloatFromRight;
         }}
         renderScene={(route, navigator) => {
           if(route.component){
             // Pass the navigator the the component so it can navigate as well.
             // Pass firebaseApp so it can make calls to firebase.
             return React.createElement(route.component, { navigator, firebaseApp});
           }
       }} />
     );
   }
 }

 AppRegistry.registerComponent('rnfirebaseauth', () => rnfirebaseauth);

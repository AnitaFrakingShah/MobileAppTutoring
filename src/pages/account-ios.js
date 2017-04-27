'use strict';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  ToolbarAndroid
} from 'react-native';
import React, {Component} from 'react';
import Login from './Login-ios';
import Search from './signup-ios';
import Tabs from '../components/tabs.js';
import styles2 from '../styles/common-styles.js';




export default class Account extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    }
  }

  componentWillMount() {
    // get the current user from firebase
    const userData = this.props.firebaseApp.auth().currentUser;

    this.setState({
      user: userData,
      loading: false,
    });
  }

  render() {
   return (
     <View style={styles.container}>
       <Tabs>
         {/* First tab */}
         <View title="HOME" style={styles.content}>
           <Text style={styles.header}>
             Welcome to Stamford Tutoring
           </Text>
           <Text style={styles.text}>
             This is where one would see their scheduled appointments
           </Text>
         </View>
         {/* Second tab */}
         <View title="TUTORS" style={styles.content}>
           <Text style={styles.header}>
             Find Tutors
           </Text>
           <Text style={styles.text}>
             This is where one would search for tutors with specific areas of focus.
           </Text>
         </View>
         {/* Third tab */}
         <View title="SETTINGS" style={styles.content}>
           <Text style={styles.header}>
             Account Information
           </Text>
           <Text style={styles.text}>
             This is where one would find login information, payment information,
             number of children looking for tutors
           </Text>
         </View>
         {/* Third tab */}
         <View title="LOGOUT" style={styles.content}>
           <Text style={styles.header}>
             Logout
           </Text>
           <TouchableHighlight onPress={this.logout.bind(this)} style={styles2.primaryButton2}>
             <Text style={styles2.primaryButtonText2}>Logout</Text>
           </TouchableHighlight>
         </View>

       </Tabs>
     </View>
   );
 }


logout() {
  // logout, once that is complete, return the user to the login screen.
  this.props.firebaseApp.auth().signOut().then(() => {
    this.props.navigator.push({
      component: Login
    });
  });
}

  componentWillUnmount() {
     navigator.geolocation.clearWatch(this.watchId);
   };
}

const styles = StyleSheet.create({
  // App container
  container: {
    flex: 1,                            // Take up all screen
    backgroundColor: '#39ccc7',         // Background color
  },
  // Tab content container
  content: {
    flex: 1,                            // Take up all available space
    justifyContent: 'center',           // Center vertically
    alignItems: 'center',               // Center horizontally
    backgroundColor: '#2fa8a4',         // Darker background for content area
  },
  // Content header
  header: {
    margin: 10,                         // Add margin
    color: '#FFFFFF',                   // White color
    fontFamily: 'Avenir',               // Change font family
    fontSize: 26,
    textAlign: 'center',                  // Bigger font size
  },
  // Content text
  text: {
    marginHorizontal: 20,               // Add horizontal margin
    color: 'rgba(255, 255, 255, 0.75)', // Semi-transparent text
    textAlign: 'center',                // Center
    fontFamily: 'Avenir',
    fontSize: 18,
  },
  email_container: {
    padding: 20
  },
  email_text: {
    fontSize: 18
  }
});

AppRegistry.registerComponent('Account', () => Account);

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Alert,
  useColorScheme,
  View,
} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import firebase from '@react-native-firebase/app'; 
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import MainNavigator from './navigation/mainNavigation';
import {navigationRef} from './navigation/navHelper';
import Drawer from './navigation/drawerNavigation';

import WelcomeScreen from './screens/welcomeScreen';
import SignIn from './screens/user/signInScreen';
import SignUp from './screens/user/signUpScreen';
// import Notifications from './service/notifications';

PushNotification.createChannel({
  channelId:"SHU_Channel_Id01",
  channelName:"Normal Notification",
  channelDescription:"A channel to categories your Notification",
  playSound:true,
  soundName: "default",
  importance:4,
  vibrate: true,
},(created) => console.log('Created Channel returned ' + created));

const App: () => Node = () => {

  useEffect(() => {

    messaging().getToken(firebase.app().options.messagingSenderId) 
        .then(x => console.log("Auth Token : {{ " + x + " }}")) 
        .catch(e => console.log(e));

    messaging().setBackgroundMessageHandler( async remoteMessage => {
      console.log(" Background Message Handler : " + remoteMessage);
    });
    
    const unsub = messaging().onMessage( async remoteMessage => {
      if(remoteMessage.data.body !== undefined && remoteMessage.data.body != undefined){
        
        PushNotification.localNotification({
          message:remoteMessage.data.body,
          title:remoteMessage.data.title,
          channelId:"SHU_Channel_Id01",
          vibrate: true,
          vibration: 300,
          autoCancel: true,
        });

      }else{
        PushNotification.localNotification({
          message: JSON.stringify(remoteMessage.data),
          title:"Unknown Miscellaneous Message",
          channelId:"SHU_Channel_Id01",
          vibrate: true,
          vibration: 300,
          autoCancel: true,
        });
      }

      console.log(" Incoming Message : " + JSON.stringify(remoteMessage));
    });

    return unsub;

  }, []);

  return (
    <View style={{flex: 1}}>
        {/*<Notifications/>*/}
        <StatusBar translucent={true} backgroundColor="#000" />
        <SafeAreaProvider>
            <NavigationContainer ref={navigationRef}>
                <MainNavigator />
            </NavigationContainer>
        </SafeAreaProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

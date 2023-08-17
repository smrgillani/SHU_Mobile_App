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

import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

PushNotification.createChannel({
	channelId:"SHU_Channel_Id01",
	channelName:"Normal Notification",
	channelDescription:"A channel to categories your Notification",
	playSound:true,
	soundName: "default",
	importance:4,
	vibrate: true,
},(created) => console.log('Created Channel returned ' + created));


const Notifications = ({navigation}) => {

	React.useEffect(() => {
    
    try {

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


    } catch(e) {

    }

  }, []);

  return null;

};
export default Notifications;
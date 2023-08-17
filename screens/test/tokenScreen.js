import React, {useState} from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TopHeader from '../../components/topHeader';
import fontFamily from '../../constants/fontFamily';
import Hook from '../../hooks';
import images from '../../constants/images';
import { postData } from '../../service/httpService';
import * as Constant from '../../service/constantVars';
import firebase from '@react-native-firebase/app'; 
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import Notifications from '../../service/notifications';

const TokenScreen = ({navigation}) => {
  const [kbHeight] = Hook.useKeyboard();
  const [deviceToken, setDeviceToken] = useState('');

  React.useEffect(() => {

    messaging().getToken(firebase.app().options.messagingSenderId) 
        .then(x => {console.log("Auth Token : {{ " + x + " }}"); setDeviceToken(x); }) 
        .catch(e => console.log(e));

  }, []);

  return (
    <ScrollView style={{backgroundColor: '#151833'}}>
    <Notifications/>
      <View style={styles.mainContainer}>
        {kbHeight === 0 && (
          <TopHeader subText={'Welcome Back!'} />
        )}

        <View style={[styles.formView, {marginTop: kbHeight ? 80 : 0}]}>
          <TextInput style={[styles.input]} value={deviceToken} onChangeText={(text) => setDeviceToken(text)} placeholder="Token" />
        </View>
      </View>
    </ScrollView>
  );
};
export default TokenScreen;
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#151833',
    paddingLeft: 45,
    paddingRight: 45,
  },
  middleImg: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    textAlign: 'center',
    marginBottom: 15,
    fontFamily: fontFamily.Nunito_Regular,
    fontSize: 16,
    height: 50,
  },
  forgotText: {
    fontFamily: fontFamily.Nunito_Bold,
    fontSize: 16,
    color: '#FFF',
    marginBottom: 15,
    textAlign: 'center',
  },
  signUpText: {
    fontFamily: fontFamily.Nunito_Bold,
    fontSize: 16,
    color: '#FFF',
    marginBottom: 15,
    textAlign: 'center',
  },
  signUpSubText: {
    fontWeight: 'bold',
    color: '#34FFDA',
  },
  commonBtn: {
    elevation: 5,
    height: 50,
    backgroundColor: '#34B6FF',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  signUpText: {
    fontFamily: fontFamily.Nunito_Regular,
    fontSize: 16,
    letterSpacing: 4,
    color: '#fff',
  },
  bottomView: {
    marginTop: 50,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontFamily: fontFamily.Nunito_Bold,
    fontSize: 16,
    letterSpacing: 4,
    color: '#FFF',
    fontWeight: 'bold',
    marginTop: 0,
  },
});
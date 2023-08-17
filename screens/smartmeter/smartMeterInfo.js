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
// import LinearGradient from 'react-native-linear-gradient';
import Hook from '../../hooks';
import images from '../../constants/images';
import { postData } from '../../service/httpService';
import * as Constant from '../../service/constantVars';
import ComboBox from 'react-native-combobox';

const SmartMeterInfo = ({navigation, route}) => {
  const [kbHeight] = Hook.useKeyboard();
  
  const login = async () => {
    const payload = {
      userName: userEmail,
      password: userPassword
    }

    postData(`${Constant.ApiMethods.login}`, false, payload).then( async (response) => {
        if (response !== undefined) {
          
          if(response.token !== undefined){
            await storeUserSession(response.token,0);

            var rus = await retrieveUserSession();
            rus = rus != null ? JSON.parse(rus) : null;

            if (rus.token.length > 0) {
                navigation.navigate('Dashboard');
            } else {
              Alert.alert("User Email or Password is incorrect.");
            }
          }else{
            Alert.alert("User Email or Password is incorrect.");
            navigation.navigate('Dashboard');
          }
        } else {
            Alert.alert("User Email or Password is incorrect.");
            navigation.navigate('Dashboard');
        }
    })

  }

  return (
    <ScrollView style={{backgroundColor: '#151833'}}>
      <View style={styles.mainContainer}>

      <View style={styles.acdnView}>
          <Text style={styles.acdnContentText}>Name : {route.params.SmartMeterName}</Text>
          <Text style={styles.acdnContentText}>Version : 1.0</Text>
          <Text style={styles.acdnContentText}>Serial Number : {route.params.SmartMeterName}</Text>
          <Text style={styles.acdnContentText}>Warranty Limit : 1 Year</Text>
      </View>

      <View style={styles.acdnView}>
          <Text style={[styles.acdnContentText, {borderBottomWidth:1, borderBottomColor:'#40467d', marginRight:9,}]}>Device Physical Addresses </Text>
          <Text style={styles.acdnContentText}>Wifi : 00-B0-D0-63-C2-26</Text>
          <Text style={styles.acdnContentText}>Bluetooth : 00-F2-88-B4-11-A2</Text>
      </View>
        
      </View>
    </ScrollView>
  );
};
export default SmartMeterInfo;
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#151833',
    paddingLeft: 10,
    paddingRight: 10,
  },
  acdnContent: {
    borderRadius: 15,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    marginLeft:5,
    marginRight:5,
    backgroundColor: '#737383'
  },
  acdnContentText: {
    fontSize:17,
    marginLeft:9,
    padding:5,
    color:'#fff',
    fontWeight: 'bold'
  },
  acdnView: {
    marginTop:15,
    borderRadius: 15,
    backgroundColor: '#737383',
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
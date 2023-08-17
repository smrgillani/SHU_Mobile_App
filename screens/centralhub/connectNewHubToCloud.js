import React, {useState} from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Switch,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';
import fontFamily from '../../constants/fontFamily';
import images from '../../constants/images';
import { postData } from '../../service/httpService';
import * as Constant from '../../service/constantVars';

const ConnectNewHubToCloud = ({navigation, route}) => {
  const [selectedId, setSelectedId] = useState(1);
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const connectCloud = () => {

    if(userEmail === ''){
      Alert.alert("Error", "Please enter your cloud email address.");
    }
    else if(userPassword === ''){
      Alert.alert("Error", "Please enter your password.");
    }
    else{

      const payload = {
        userName: userEmail,
        password: userPassword
      }

      postData(`${Constant.ApiMethods.login}`, false, payload).then( (response) => {
          if (response !== undefined) {
            
            if(response.token !== undefined && response.token.length > 0){
              
              navigation.navigate('FinishHubSetup', {IoTHubId: route.params.IoTHubId});
              
              Alert.alert("Message", "Your central hub device successfully connected to cloud.");

            }else{
              Alert.alert("Error", "Unable to login into your cloud account.");
            }

          } else {
              Alert.alert("Error", "Unable to login into your cloud account.");
          }
      })
    }

  }

  return (
    <View style={styles.mainContainer}>

    <Text style={styles.subText}>Cloud Information</Text>

      <View style={styles.mainView}>
        
        <TextInput style={[styles.input]} onChangeText={(text) => setUserEmail(text)} placeholder="Enter your cloud email here" />
        <TextInput style={[styles.input]} secureTextEntry={true} onChangeText={(text) => setUserPassword(text)} placeholder="Enter your cloud password here" />

      </View>
      <TouchableOpacity onPress={() => connectCloud()} style={styles.commonBtn}>
        <Text style={styles.nextText}>NEXT</Text>
      </TouchableOpacity>
      
      <View style={styles.flatSliderView}>
        {/*<FlatList
          data={list}
          renderItem={listRender}
          keyExtractor={item => item.id}
          horizontal={true}
        />*/}
      </View>
    
    </View>
  );
};
export default ConnectNewHubToCloud;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#151833'
  },
  acdnHeader: {
    borderRadius: 15,
    backgroundColor: '#9d9ea8'
  },
  acdnHeaderWNBR: {
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    margin:5,
    marginBottom:0,
    backgroundColor: '#9d9ea8'
  },
  acdnHeaderText: {
    fontSize:25,
    marginLeft:15,
    padding:5,
    color: '#151833',
    fontWeight: 'bold'
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
  acdnContent: {
    borderRadius: 15,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    marginLeft:5,
    marginRight:5,
    backgroundColor: '#737383'
  },
  acdnContentText: {
    fontSize:22,
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
  mainView: {
    margin:5,
    marginTop: 10,
  },
  subText: {
    fontSize: 18,
    marginLeft: 15,
    marginTop:28,
    marginBottom:30,
    fontFamily: fontFamily.Nunito_Regular,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#FFF',
  },
  btSwitch: {
    marginRight: 20,
    padding:0,
    flexDirection: "row",
    flex: 1,
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
  },
  commonBtn: {
    elevation: 5,
    height: 50,
    backgroundColor: '#34B6FF',
    display: 'flex',
    justifyContent: 'center',
    width: '96%',
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
    position: 'absolute',
    bottom:0,
    left:0,
    margin:'2%'
  },
  nextText: {
    fontFamily: fontFamily.Nunito_Bold,
    fontSize: 16,
    letterSpacing: 4,
    color: '#FFF',
    fontWeight: 'bold',
    marginTop: 0,

  },
});
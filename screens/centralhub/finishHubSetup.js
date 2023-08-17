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

const FinishHubSetup = ({navigation, route}) => {
  const [selectedId, setSelectedId] = useState(1);

  React.useEffect(() => {
    
    try {

      const _addCentralHub = async () => {
        await addCentralHub();
      };

      _addCentralHub();

    } catch(e) {

    }

  }, []);

  const addCentralHub = async () => {

    if(route.params.IoTHubId === ''){
      Alert.alert("Error", "Unable to find your device serial number.");
    }
    else{

      const payload = {
        serialId: route.params.IoTHubId,
        name: route.params.IoTHubId
      }

      postData(`${Constant.ApiMethods.centralHubs}`, true, payload).then( async (response) => {
          if (response !== undefined) {
            
            if(response.id !== undefined){

              if (response.id != undefined && response.id.length > 0) {
                Alert.alert("Message", "Your Central IoT Hub is successfully setup and ready to work with your smart meters after a reboot");
              } else {
                Alert.alert("Error", "Unable to add your Central hub device.");
              }

            }else{
              Alert.alert("Error", "Unable to add your Central hub device.");
            }
          } else {
              Alert.alert("Error", "Unable to add your Central hub device.");
          }
      })
    }

  }

  return (
    <View style={styles.mainContainer}>

    <Text style={styles.subText}>Your Central IoT Hub is successfully setup and ready to work with your smart meters after a reboot. </Text>

      <View style={styles.mainView}>
	      <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={styles.commonBtn}>
	      	<Text style={styles.nextText}>DONE</Text>
	      </TouchableOpacity>
	      
	      <TouchableOpacity onPress={() => navigation.navigate('StartMeterSetup')} style={styles.commonBtn}>
	      	<Text style={styles.nextText}>SETUP NEW SMART METER</Text>
	      </TouchableOpacity>
      </View>
      
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

export default FinishHubSetup;

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
    marginRight: 15,
    marginTop:'60%',
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
    bottom:0,
    left:0,
    margin:'2%',
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
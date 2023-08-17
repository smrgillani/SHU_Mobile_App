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
  TouchableOpacity,
  Switch,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';
import fontFamily from '../../constants/fontFamily';
import images from '../../constants/images';
import BluetoothStateManager from 'react-native-bluetooth-state-manager';
import BleManager from 'react-native-ble-manager';

const BluetoothSwitch = ({navigation, route}) => {
  const [selectedId, setSelectedId] = useState(1);
  const [isBTEnabled, setIsBTEnabled] = useState(false);

  const _turnBluetoothOn = () => {

    if(isBTEnabled){
      
      BluetoothStateManager.disable().then(() => {
        setIsBTEnabled(previousState => !previousState);
      }).catch((error) => {
        
        Alert.alert("Error", " The user refuse to disable Bluetooth. ",
          [{text: "OK"}]
        );

      });

    }else {

      BluetoothStateManager.requestToEnable().then(() => {
        setIsBTEnabled(previousState => !previousState);
      }).catch((error) => {
        Alert.alert("Error", " The user refuse to disable Bluetooth. ",
          [{text: "OK"}]
        );
      });
      
    }
  }

  const _checkIfBluetoothOn = () => {
    console.log("Bluetooth State clicked");
    BluetoothStateManager.getState().then((bluetoothState) => {
      switch (bluetoothState) {
        case 'Unknown':
          Alert.alert("Error", "Unable to found bluetooth on your mobile device.",
            [{text: "OK"}]
          );
          break;
        case 'Resetting':
          Alert.alert("Error", "Bluetooth is in reset mode on your mobile device, try again.",
            [{text: "OK"}]
          );
          break;
        case 'Unsupported':
          Alert.alert("Error", "Bluetooth is not supported on your mobile device.",
            [{text: "OK"}]
          );
          break;
        case 'Unauthorized':
          Alert.alert("Error", "Bluetooth is not authorized on your mobile device, try again.",
            [{text: "OK"}]
          );
          break;
        case 'PoweredOff':
          Alert.alert("Error", "Bluetooth is not turned on your mobile device, please turn on your bluetooth and then try again.",
            [{text: "OK"}]
          );
          break;
        case 'PoweredOn':
          navigation.navigate('AddNewHub', {IoTHubId: route.params.IoTHubId});
          break;
        default:
          break;
      }
    }).catch((error) => {
        Alert.alert("Error", " Unable to locate your Bluetooth. ",
          [{text: "OK"}]
        );
    });
  }

  return (
    <View style={styles.mainContainer}>

    <Text style={styles.subText}>Bluetooth on your mobile device is not turned on, to setup your New Central IoT Hub or New Smart meter 
    your bluetooth must be turned on.</Text>

      <View style={styles.mainView}>
        
        <Text style={styles.subText}>Turn on your bluetooth</Text>

        <Switch
          trackColor={{ false: "#DDD", true: "#05bd05" }}
          thumbColor={"#34B6FF"}
          style={styles.btSwitch}
          ios_backgroundColor="#3e3e3e"
          onValueChange={_turnBluetoothOn}
          value={isBTEnabled}
          />

      </View>

      <TouchableOpacity onPress={() => {_checkIfBluetoothOn();}} style={styles.commonBtn}>
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
export default BluetoothSwitch;
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
    flexDirection: "row",
    flexWrap: "wrap",
    margin:5,
    backgroundColor:'#949494',
    borderRadius:23,
    marginTop: 10,
  },
  subText: {
    fontSize: 18,
    marginLeft: 15,
    marginRight: 15,
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
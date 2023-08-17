import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Switch,
  PermissionsAndroid,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';
import fontFamily from '../../constants/fontFamily';
import images from '../../constants/images';
import WifiManager from 'react-native-wifi-reborn';

const ConnectMeterToWifi = ({navigation, route}) => {
  const [selectedId, setSelectedId] = useState(1);
  const [isEnabled, setIsEnabled] = useState(false);
  const [wifiList, setWifiList] = useState([]);
  const [ssid, setSsid] = useState('');

  const initWifi = async () => {
    try {
      const ssid = await WifiManager.getCurrentWifiSSID();
      setSsid(ssid);
      console.log('Your current connected wifi SSID is ' + ssid);
    } catch (error) {
      setSsid('Cannot get current SSID!' + error.message);
      console.log('Cannot get current SSID!', {error});
    }
  }

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "React Native Wifi Reborn App Permission",
          message:
            "Location permission is required to connect with or scan for Wifi networks. ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // initWifi();
        getListOfWifis();
      } else {
        console.log("Location permission denied");

        Alert.alert("Error", " User refuse request to load available wifi connections. ",
          [{text: "OK"}]
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getListOfWifis = async () => {
    try {
      const data = await WifiManager.reScanAndLoadWifiList();
      setWifiList(data);
      
      console.log("data" + data);
    } catch (error) {
      console.log(error);
    }
  }

  const _getListOfWifis = (data) => {
    const listOfWifis = [];
    
    try {
           
      for (let i = 0; i < data.length; i++) {
        listOfWifis.push(<TouchableOpacity onPress={() => navigation.navigate('FinishMeterSetup', {IoTHubWifiSSID : data[i].SSID, SmartMeterId: route.params.SmartMeterId, SmartMeterType: route.params.SmartMeterType, IoTHubId: route.params.IoTHubId})}>
        <View style={styles.mainView}>
          <Text style={styles.subText}>{data[i].SSID}</Text>
          <View style={styles.wfiIcon}>
            <Image style={{ resizeMode: "stretch", width:25, height:20, marginTop:9, }} source={images.wifiImage} />
          </View>
                </View>
          </TouchableOpacity>);
      }
      
    } catch (error) {
      console.log(error);
    }

    return listOfWifis;
  }

  useEffect(() => {
    requestLocationPermission();
  }, []);

  return (
    <View style={styles.mainContainer}>

    <Text style={[styles.subText, styles.subTextLT]}>Your new Smart meter will use your selected Wifi to connect with your designated Central IoT Hub.</Text>
    
    <Text style={styles.subText}>Select a wifi network for your new Smart Meter</Text>

    {wifiList && (_getListOfWifis(wifiList))}

    <TouchableOpacity onPress={() => { navigation.navigate('AddNewHub'); }} style={styles.commonBtn}>
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
export default ConnectMeterToWifi;

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
    flexDirection: "row",
    flexWrap: "wrap",
    margin:5,
    backgroundColor:'#949494',
    borderRadius:23,
    marginTop: 10,
  },
  subText: {
    fontSize: 22,
    marginLeft: 15,
    marginTop:10,
    marginBottom:10,
    marginRight: 15,
    fontFamily: fontFamily.Nunito_Regular,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#FFF',
  },
  subTextLT: {
    fontSize: 16,
  },
  wfiIcon: {
    marginRight: 20,
    marginTop:7,
    padding:0,
    flexDirection: "row",
    flex: 1,
    justifyContent: 'flex-end'
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
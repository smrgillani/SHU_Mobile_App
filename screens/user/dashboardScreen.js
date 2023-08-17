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
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useIsFocused } from '@react-navigation/native';
import Accordion from 'react-native-collapsible/Accordion';
import BluetoothStateManager from 'react-native-bluetooth-state-manager';
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import fontFamily from '../../constants/fontFamily';
import images from '../../constants/images';
import { getData } from '../../service/httpService';
import * as Constant from '../../service/constantVars';

const Dashboard = ({navigation}) => {
  const [selectedId, setSelectedId] = useState(1);
  const [data, setData] = useState(undefined);
  const isFocused = useIsFocused();

  React.useEffect(() => {
    
    try {

      const loadAllCentralHub = async () => {

        await getData(`${Constant.ApiMethods.centralHubs}`, true).then((response) => {
          if (response !== undefined) {
            setData(response);
          } else {
            Alert.alert("Error","Unable to load User data, please check internet connection.");
          }

        });
      };

      if(isFocused === true)
        loadAllCentralHub();

    } catch(e) {

    }

  }, [isFocused]);

   const renderAllHubs = (data) => {
    const listOfnearByHubs = [];

      for (let i=0; i < data.length; i++) {

        const listofMeters = [];

        for(let j=0; j < data[i].devices.length; j++){

          let imageVar;

          if(data[i].devices[j].meterInfo.type === "GAS_METER"){
            imageVar = images.gasMeter;
          }

          if(data[i].devices[j].meterInfo.type === "ELECTRICITY_METER"){
            imageVar = images.electricityMeter;
          }

          if(data[i].devices[j].meterInfo.type === "WATER_METER"){
            imageVar = images.waterMeter;
          }



          listofMeters.push(
            <TouchableOpacity key={data[i].devices[j].meterInfo.id} onPress={() => navigation.navigate('SmartMeterDetail', {SmartMeterId:data[i].devices[j].meterInfo.id})}>
              <View style={styles.subMainView}>
                <Text style={[styles.acdnHeaderText,{color:'#fff'}]}>{data[i].devices[j].meterInfo.name}</Text>
                <View style={styles.smIcon}>
                  <Image style={{ resizeMode: "stretch", width:14, height:20, marginTop:10, }} source={imageVar} />
                </View>
              </View>
            </TouchableOpacity>
          );
        }

        listOfnearByHubs.push(
          <Collapse style={styles.acdnView} key={data[i].hubDetails.id}>
          <CollapseHeader style={styles.acdnHeader}>
            <View style={styles.subMainView}>
              <Text style={styles.acdnHeaderText}>{data[i].hubDetails.name}</Text>
              <View style={styles.smIcon}>
                <TouchableOpacity key={data[i].hubDetails.id} onPress={() => navigation.navigate('StartMeterSetup', {IoTHubId : data[i].hubDetails.id})}>
                  <Image style={{ resizeMode: "stretch", width:34, height:30, marginTop:4, }} source={images.smartMeter} />
                </TouchableOpacity>
              </View>
            </View>

          </CollapseHeader>
          <CollapseBody style={styles.acdnContent}>
            {listofMeters}
          </CollapseBody>
        </Collapse>
        );
    }
    return listOfnearByHubs;
  }

  const getView = () => {
    if(data != undefined && data.length > 0){
      return renderAllHubs(data);
    }else{
      return <View><Text style={styles.subText}>Add your new central IOT hub</Text><Image style={styles.arrowImageStyle} source={images.downArrowImage}/></View>
    }
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.mainView}>
        
        {getView()}

      </View>

      <TouchableOpacity activeOpacity={0.7} onPress={() => {
        BluetoothStateManager.getState().then((bluetoothState) => {
          console.log("Bluetooth State" + bluetoothState);
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
              navigation.navigate('BTSwitch');
              break;
            case 'PoweredOn':
              navigation.navigate('AddNewHub');
              break;
            default:
              break;
          }
        });
      }} style={styles.touchableOpacityStyle}>
          <Image source={images.plusImage} style={styles.floatingButtonStyle}/>
        </TouchableOpacity>
    </View>
  );
};
export default Dashboard;
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
    margin:5,
    marginTop: 10,
  },
  subMainView: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  smIcon: {
    marginRight: 10,
    marginTop:2,
    padding:0,
    flexDirection: "row",
    flex: 1,
    justifyContent: 'flex-end'
  },
  cardView: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 20,
    resizeMode: 'center',
  },
  priceText: {
    fontSize: 30,
    fontFamily: fontFamily.Nunito_Bold,
    color: '#A884FF',
    textAlign: 'center',
    marginBottom: 17,
  },
  titleText: {
    fontSize: 16,
    fontFamily: fontFamily.Nunito_Regular,
    color: '#707070',
    textAlign: 'center',
  },
  sliderCard: {
    padding: 20,
    borderRadius: 30,
    // width: ITEM_WIDTH,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  imgView: {
    width: 50,
    height: 50,
    // backgroundColor: '#A884FF',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatSliderView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  listCard: {
    marginLeft: 10,
    marginRight: 10,
  },
  btnView: {
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 30,
  },

  commonBtn: {
    elevation: 5,
    height: 50,
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 15,
    marginBottom: 30,
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
    color: '#fff',
  },
  touchableOpacityStyle: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    backgroundColor : '#4c4e61',
    borderRadius:50,
  },
  floatingButtonStyle: {
    resizeMode: 'contain',
    width: 35,
    height: 35,
  },
  arrowImageStyle: {
    resizeMode: 'contain',
    height: '65%',
  },
  subText: {
    fontSize: 18,
    marginTop:150,
    marginBottom:30,
    fontFamily: fontFamily.Nunito_Regular,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#FFF',
  },
});
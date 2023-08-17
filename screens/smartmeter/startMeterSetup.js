import React, {useState} from 'react';
import {
  View,
  Text,
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
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import fontFamily from '../../constants/fontFamily';
import images from '../../constants/images';

const StartMeterSetup = ({navigation,route}) => {
  const [selectedId, setSelectedId] = useState(1);

  const getRandomNewMeterId = (length) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
    
    return result;
  }


  const renderAllMeters = () => {
    const listOfnearByMeters = [];
    let getRandCount = Math.floor(Math.random() * 10);

    const meterTypes = ["WATER_METER", "GAS_METER", "ELECTRICITY_METER"];
    const meterTypesNames = ["Water", "Gas", "Electricity"];

      for (let i=0; i < 4; i++) {

        let smId = getRandomNewMeterId(8);

        const randomMeterIndex = Math.floor(Math.random() * meterTypes.length);

        listOfnearByMeters.push(
          <View style={styles.acdnView} key={smId}>
            <View style={styles.acdnHeader}>
              <TouchableOpacity onPress={() => navigation.navigate('ConnectNewMeterToBT', {SmartMeterId: smId, SmartMeterType: meterTypes[randomMeterIndex], IoTHubId: route.params.IoTHubId})}>
                <Text style={styles.acdnHeaderText}>{smId} Smart {meterTypesNames[randomMeterIndex]} Meter</Text>
              </TouchableOpacity>
            </View>
          </View>
        )
    }
    return listOfnearByMeters;
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.mainView}>

        <Text style={styles.subText}>Select your new Smart Meter to Setup</Text>

        {renderAllMeters()}

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
export default StartMeterSetup;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#151833'
  },
  acdnHeader: {
    borderRadius: 15,
    backgroundColor: '#c2c3cd'
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
    fontSize:22,
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
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

const AddNewHub = ({navigation}) => {
  const [selectedId, setSelectedId] = useState(1);

  const getRandomNewHubId = (length) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
    
    return result;
  }


  const renderAllHubs = () => {
    const listOfnearByHubs = [];
    let getRandCount = Math.floor(Math.random() * 10);

      for (let i=0; i < 4; i++) {

        let hubId = getRandomNewHubId(9);

        listOfnearByHubs.push(
          <View style={styles.acdnView} key={hubId}>
            <View style={styles.acdnHeader}>
              <TouchableOpacity onPress={() => navigation.navigate('ConnectNewHubBT', {IoTHubId: hubId})}>
                <Text style={styles.acdnHeaderText}>{hubId} IOT Central Hub</Text>
              </TouchableOpacity>
            </View>
          </View>
        )
    }
    return listOfnearByHubs;
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.mainView}>
        <Text style={styles.subText}>Select your new central IOT hub to Setup</Text>

        {renderAllHubs()}


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
export default AddNewHub;
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
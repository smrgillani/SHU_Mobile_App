import React, {useState} from 'react';
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
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';
import fontFamily from '../../constants/fontFamily';
import images from '../../constants/images';

const ConnectHubToCloud = ({navigation, route}) => {
  const [selectedId, setSelectedId] = useState(1);
  
  return (
    <View style={styles.mainContainer}>

    <Text style={styles.subText}>Do you want your Central IoT Hub to be connected with Cloud ?</Text>

      <View style={styles.mainView}>
	      <TouchableOpacity onPress={() => navigation.navigate('FinishHubSetup', {IoTHubId: route.params.IoTHubId})} style={styles.commonBtn}>
	      	<Text style={styles.nextText}>NO</Text>
	      </TouchableOpacity>
	      
	      <TouchableOpacity onPress={() => navigation.navigate('ConnectNewHubToCloud', {IoTHubId: route.params.IoTHubId})} style={styles.commonBtn}>
	      	<Text style={styles.nextText}>YES</Text>
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

export default ConnectHubToCloud;

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
    flexDirection: "row",
    flex: 1,
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
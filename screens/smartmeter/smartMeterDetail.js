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
import RNSpeedometer from 'react-native-speedometer';
import { getData } from '../../service/httpService';
import * as Constant from '../../service/constantVars';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

const StartMeterDetail = ({navigation, route}) => {
  const [meterData, setMeterData] = useState(undefined);
  const [dcData, setDCData] = useState([0,0,0,0,0,0,0]);
  const [mConsumption, setMConsumption] = useState('');
  const [mPlanLimit, setMPlanLimit] = useState(1);
  const [mPlanUsed, setMPlanUsed] = useState(0);
  const [smType, setSMType] = useState('');
  const [selectedId, setSelectedId] = useState(1);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isUtilityOn, setIsUtilityOn] = useState(false);
  const [planBtnTxt, setPlanBtnTxt] = useState('NEW PLAN');
  const [planId, setPlanId] = useState('');
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const meterTypes = ["WATER_METER", "GAS_METER", "ELECTRICITY_METER"];
  const meterTypesNames = ["Water", "Gas", "Electricity"];

  const delayForApiCalls = 5;

  React.useEffect(() => {
    
    try {

      const loadMeterDetails = async () => {

        await getData('smart-utility-iot/devices/' + route.params.SmartMeterId, true).then((response) => {
          if (response !== undefined) {
            setMeterData(response);
            setDCData(response.dailyConsumption);
            setIsUtilityOn(response.meterInfo.status);

            const getType = meterTypes.indexOf(response.meterInfo.type);

            if(getType > -1){
              setSMType(meterTypesNames[getType]);
            }

            if(response.plan != null){
              const planLimit = response.plan.totalUnit;
              let planUsed = response.plan.consumption;

              planUsed = planUsed > planLimit ? planLimit : planUsed;

              setMPlanLimit(planLimit);
              setMPlanUsed(planUsed);

              let totalUsagePer = ((planUsed/planLimit)*100);

              totalUsagePer = totalUsagePer > 100 ? 100 : totalUsagePer;

              setMConsumption(Math.round(totalUsagePer));
              setPlanBtnTxt('VIEW PLAN');
              setPlanId(response.plan.id);
            }
          } else {
            Alert.alert("Error","Unable to load User data, please check internet connection.");
          }

        });
      };

      // ;
      loadMeterDetails();

      let timer1 = setInterval(()=>loadMeterDetails(), 60000);

      return () => {
        clearTimeout(timer1);
      };



    } catch(e) {

    }

  }, []);

  const meterSwitch = () => {
  }

  const screenWidth = Dimensions.get("window").width;
  
  const data = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        data: dcData,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        strokeWidth: 3
      }
    ],
  };

const chartConfig = {
  backgroundColor: "#000",
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0,
  color: (opacity = 0) => `rgba(0, 0, 0, 0)`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  propsForDots: {
    strokeWidth: "2",
    stroke: "#fff"
  },
  strokeWidth: 2,
  barPercentage: 0.5,
  propsForBackgroundLines: {
    strokeWidth: 0
  },
  useShadowColorFromDataset: false
};

  return (
    <ScrollView>
    <View style={styles.mainContainer}>
      <View style={styles.mainView}>

      <RNSpeedometer 
        labels={[
          {
            labelColor: '#48abdb',
            activeBarColor: '#48abdb',
          },
          {
            labelColor: '#48abdb',
            activeBarColor: '#48abdb',
          },
          {
            labelColor: '#48abdb',
            activeBarColor: '#48abdb',
          },
          {
            labelColor: '#ff2900',
            activeBarColor: '#ff2900',
          },
        ]}
        innerCircleStyle = {{
          backgroundColor: '#151833'
        }}
        labelStyle = {{display: 'none'}}
        value={mPlanUsed && mPlanUsed}
        minValue = {0}
        allowedDecimals={0}
        maxValue = {mPlanLimit && mPlanLimit}
        size={(screenWidth-20)} 
      />

      <Text style={styles.subText}>{mConsumption && mConsumption}% Consumed</Text>
      
      <View>
        <LineChart style={{marginTop:10,marginLeft:-10}} data={data} width={screenWidth} height={170} chartConfig={chartConfig} bezier />
      </View>

      <View style={[styles.subMainView, {borderBottomWidth:1, marginTop:9, borderBottomColor:'#40467d'}]}>
        
        <Text style={[styles.subMText,styles.subMLText]}> Meter Name : </Text>
        <Text style={[styles.subMText,styles.subMRText, {flex:2}]}> {meterData && meterData.meterInfo.name} </Text>

      </View>

      <View style={[styles.subMainView, {borderBottomWidth:1, marginTop:9, borderBottomColor:'#40467d'}]}>
        
        <Text style={[styles.subMText,styles.subMLText]}> Meter Type : </Text>
        <Text style={[styles.subMText,styles.subMRText, {flex:2}]}> {smType && smType} </Text>

      </View>

      <View style={[styles.subMainView, {borderBottomWidth:1, marginTop:4, borderBottomColor:'#40467d'}]}>
        
        <Text style={[styles.subMText, {marginTop:0}]}> Utility Power Switch </Text>

        <Switch
          trackColor={{ false: "#DDD", true: "#05bd05" }}
          thumbColor={"#34B6FF"}
          style={styles.btSwitch}
          ios_backgroundColor="#3e3e3e"
          onValueChange={meterSwitch}
          value={isUtilityOn}
          />
      </View>

      <Text style={[styles.subText,{marginTop:0,marginBottom:0, textAlign:'left', marginLeft:'2%'}]}> Utilization Planning </Text>

      <View style={[styles.subMainView,{marginTop:3, marginBottom: 0, paddingBottom : 4,borderBottomWidth:1, borderBottomColor:'#40467d'}]}>
        <TouchableOpacity onPress={() => navigation.navigate('SmartMeterNewPlan',{SmartMeterId : route.params.SmartMeterId, SmartMeterPlanId: planId})} style={[styles.commonBtn,{flex: 2}]}>
          <Text style={styles.nextText}>{planBtnTxt}</Text>
        </TouchableOpacity>

        {/*<TouchableOpacity onPress={() => navigation.navigate('SmartMeterPlanDetails')} style={[styles.commonBtn,{flex: 2}]}>
          <Text style={styles.nextText}>VIEW PLAN</Text>
        </TouchableOpacity>*/}

      </View>

      <View style={[styles.subMainView,{marginTop:3}]}>

        <TouchableOpacity onPress={() => navigation.navigate('SmartMeterInfo',{SmartMeterName : meterData.meterInfo.name})} style={[styles.commonBtn,{flex: 2}]}>
          <Text style={styles.nextText}>DEVICE INFO</Text>
        </TouchableOpacity>

        {/*<TouchableOpacity onPress={() => navigation.navigate('SmartMeterUsageHistory')} style={[styles.commonBtn,{flex: 2}]}>
          <Text style={styles.nextText}>USAGE HISTORY</Text>
        </TouchableOpacity>*/}

      </View>

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
    </ScrollView>
  );
};
export default StartMeterDetail;

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
  subMainView: {
    flexDirection: "row",
    flexWrap: "wrap",
    margin:5,
    marginTop: 10,
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
    textAlign: 'LEFT',
    borderRadius: 15,
    marginBottom: 5,
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
    flex: 3,
  },
  subText: {
    fontSize: 18,
    marginTop:10,
    marginBottom:5,
    fontFamily: fontFamily.Nunito_Regular,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#FFF',
  },
  subMText: {
    fontSize: 18,
    marginTop:10,
    marginBottom:10,
    fontFamily: fontFamily.Nunito_Regular,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#FFF',
    flexDirection: "row",
    flex: 1,
  },
  subMLText: {
    textAlign: 'left',
  },
  subMRText: {
    textAlign: 'right',
  },
  nextText: {
    fontSize: 16,
    letterSpacing: 2,
    color: '#FFF',
    fontWeight: 'bold',
    marginTop: 0,
  },
});
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
import DateTimePicker from '@react-native-community/datetimepicker';
import TopHeader from '../../components/topHeader';
import fontFamily from '../../constants/fontFamily';
// import LinearGradient from 'react-native-linear-gradient';
import Hook from '../../hooks';
import images from '../../constants/images';
import { postData } from '../../service/httpService';
import { getData } from '../../service/httpService';
import * as Constant from '../../service/constantVars';

import DropDownPicker from 'react-native-dropdown-picker';

const SmartMeterNewPlan = ({navigation, route}) => {
  const [kbHeight] = Hook.useKeyboard();
  const [showToDate, setShowToDate] = useState(false);
  const [showFromDate, setShowFromDate] = useState(false);
  const [toMode, setToMode] = useState('date');
  const [fromMode, setFromMode] = useState('date');
  const [userEmail, setUserEmail] = useState('');
  const [fromDate, setFromDate] = useState(new Date(null));
  const [toDate, setToDate] = useState(new Date(null));
  const [showDates, setShowDates] = useState(false);
  const [userPassword, setUserPassword] = useState('');
  const [scheduleType, setScheduleType] = useState('');
  const [planName, setPlanName] = useState('');
  const [planType, setPlanType] = useState('');
  const [planLimit, setPlanLimit] = useState('');

  const [open, setOpen] = useState(false);
  
  const [value, setValue] = useState('');

  const [items, setItems] = useState([
    {label: 'Everyday', value: 'DAILY'},
    {label: 'Every Week', value: 'WEEKLY'},
    {label: 'Every Month', value: 'MONTHLY'},
    {label: 'Custom', value: 'custom'},
  ]);

  const showFromMode = currentMode => {
    if(currentMode === 'date'){
      setShowFromDate(true);
      setFromMode(currentMode);
    }else {
      setShowFromDate(false);
      setFromMode(currentMode);
    }
  };

  const showToMode = currentMode => {
    if(currentMode === 'date'){
      setShowToDate(true);
      setToMode(currentMode);
    }else {
      setShowToDate(false);
      setToMode(currentMode);
    }
  };

  const showDate = (newValue) => {
    setPlanType(newValue);
    if(newValue === 'custom'){
      setShowDates(true);
    }else{
      setShowDates(false);
    }
  }

  const onFromDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowFromDate(Platform.OS === 'ios');
    setFromDate(currentDate);
  };

  const onToDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowToDate(Platform.OS === 'ios');
    setToDate(currentDate);
  };

  const showFromDatepicker = () => {
    showFromMode('date');
  };

  const showToDatepicker = () => {
    showToMode('date');
  };

  React.useEffect(() => {
    try {

      const loadPlanDetails = async () => {

        await getData('smart-utility-iot/devices/' + route.params.SmartMeterId + '/plan', true).then((response) => {
          if (response !== undefined) {
            setPlanName(response.name);
            setValue(response.type);
            setPlanLimit(response.totalUnit.toString());
          } else {
            Alert.alert("Error","Unable to load User data, please check internet connection.");
          }

        });
      };

      loadPlanDetails();

    } catch(e) {

    }
  }, []);

  const addNewPlan = async () => {
    const payload = {
      type: planType,
      name: planName,
      totalUnit: planLimit
    }

    postData('smart-utility-iot/devices/' + route.params.SmartMeterId + '/plan', true, payload).then( async (response) => {
        if (response !== undefined) {
          
          if(response.id !== undefined){
            if (response.id.length > 0) {
                navigation.navigate('Dashboard');
            } else {
              Alert.alert("Unable to create Plan for your meter.");
            }
          }else{
            Alert.alert("Unable to create Plan for your meter.");
            navigation.navigate('Dashboard');
          }
        } else {
            Alert.alert("Unable to create Plan for your meter.");
            navigation.navigate('Dashboard');
        }
    })

  }

  return (
    <ScrollView style={{backgroundColor: '#151833'}}>
      <View style={styles.mainContainer}>

        <View style={[styles.formView, {marginTop: 20}]}>

        <TextInput style={[styles.input]} value={planName} onChangeText={(text) => setPlanName(text)} placeholder="Name of Plan" />
          
          <DropDownPicker
            placeholder="Select a schedule type"
            style={[styles.input]}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            onChangeValue={showDate}
            setItems={setItems}
            multiple={null}
          />

          {showDates && (
            <View>
              <TouchableOpacity style={[styles.dateinput]} onPress={showFromDatepicker}>
                <Text
                  style={{
                    fontFamily: fontFamily.Nunito_Regular,
                    fontSize: 16,
                    color: '#707070',
                  }}>
                  {fromDate != null ? fromDate.toDateString() : 'From Date'}
                </Text>
                <Image source={images.datePick} style={styles.datePick} />
              </TouchableOpacity>

              <TouchableOpacity style={[styles.dateinput]} onPress={showToDatepicker}>
                <Text
                  style={{
                    fontFamily: fontFamily.Nunito_Regular,
                    fontSize: 16,
                    color: '#707070',
                  }}>
                  {toDate != null ? toDate.toDateString() : 'To Date'}
                </Text>
                <Image source={images.datePick} style={styles.datePick} />
              </TouchableOpacity>
            </View>
          )}

          {showFromDate && (
              <DateTimePicker
                testID="fromDateTimePicker"
                value={fromDate}
                mode={fromMode}
                is24Hour={true}
                display="default"
                onChange={onFromDateChange}
              />
            )}

          {showToDate && (
              <DateTimePicker
                testID="toDateTimePicker"
                value={toDate}
                mode={toMode}
                is24Hour={true}
                display="default"
                onChange={onToDateChange}
              />
            )}

          <TextInput style={[styles.input]} value={planLimit} onChangeText={(text) => setPlanLimit(text)} placeholder="Total Usage Limit (Units / Liters /Cubic Feet)" />
          
          <View>
            <TouchableOpacity onPress={() => addNewPlan()} style={[styles.commonBtn,{marginTop: 60}]}>
              <Text style={styles.loginText}>SAVE</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </ScrollView>
  );
};
export default SmartMeterNewPlan;
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#151833',
    paddingLeft: 45,
    paddingRight: 45,
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
  dateinput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    textAlign: 'center',
    marginBottom: 15,
    fontFamily: fontFamily.Nunito_Regular,
    fontSize: 16,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#707070',
    position: 'relative',
  },
  datePick: {
    position: 'absolute',
    right: 10,
    top: 15,
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
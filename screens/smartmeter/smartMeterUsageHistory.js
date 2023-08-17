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
import * as Constant from '../../service/constantVars';
// import ComboBox from 'react-native-combobox';

import DropDownPicker from 'react-native-dropdown-picker';

const SmartMeterUsageHistory = ({navigation}) => {
  const [kbHeight] = Hook.useKeyboard();
  const [showToDate, setShowToDate] = useState(false);
  const [showFromDate, setShowFromDate] = useState(false);
  const [toMode, setToMode] = useState('date');
  const [fromMode, setFromMode] = useState('date');
  const [userEmail, setUserEmail] = useState('');
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [showDates, setShowDates] = useState(false);
  const [userPassword, setUserPassword] = useState('');
  const [scheduleType, setScheduleType] = useState('');

  let daysList = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let monthsList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Aug', 'Oct', 'Nov', 'Dec'];

  const [open, setOpen] = useState(false);
  
  const [value, setValue] = useState('');

  const [items, setItems] = useState([
    {label: 'Everyday', value: 'everyday'},
    {label: 'Every Week', value: 'everyweek'},
    {label: 'Every Month', value: 'everymonth'},
    {label: 'Custom', value: 'custom'},
  ]);

  const storeUserSession = async (tokenVal, userIdVal) => {

    try {
      await AsyncStorage.setItem('@shu_user_session', JSON.stringify({ token : tokenVal, user_id : userIdVal }));
    } catch (e) {

    }
  }

  const retrieveUserSession = async () => {
    try {

      const value = await AsyncStorage.getItem('@shu_user_session');
      
      if(value !== null) {
        return value;
      }

    } catch(e) {

    }
  }

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

  const login = async () => {
    const payload = {
      userName: userEmail,
      password: userPassword
    }

    postData(`${Constant.ApiMethods.login}`, false, payload).then( async (response) => {
        if (response !== undefined) {
          
          if(response.token !== undefined){
            await storeUserSession(response.token,0);

            var rus = await retrieveUserSession();
            rus = rus != null ? JSON.parse(rus) : null;

            if (rus.token.length > 0) {
                navigation.navigate('Dashboard');
            } else {
              Alert.alert("User Email or Password is incorrect.");
            }
          }else{
            Alert.alert("User Email or Password is incorrect.");
            navigation.navigate('Dashboard');
          }
        } else {
            Alert.alert("User Email or Password is incorrect.");
            navigation.navigate('Dashboard');
        }
    })

  }

  return (
    <ScrollView style={{backgroundColor: '#151833'}}>
      <View style={styles.mainContainer}>

        <View style={[styles.formView, {marginTop: 20}]}>
          
            <View style={styles.mainView}>
              <TouchableOpacity style={[styles.dateinput,{marginRight:5}]} onPress={showFromDatepicker}>
                <Text
                  style={{
                    fontFamily: fontFamily.Nunito_Regular,
                    fontSize: 16,
                    color: '#707070',
                  }}>
                  {fromDate != null ? (monthsList[fromDate.getMonth()] + " " + fromDate.getDate() + " " + fromDate.getFullYear()) : 'From Date'}
                </Text>
                <Image source={images.datePick} style={styles.datePick} />
              </TouchableOpacity>

              <TouchableOpacity style={[styles.dateinput,{marginRight:5}]} onPress={showToDatepicker}>
                <Text
                  style={{
                    fontFamily: fontFamily.Nunito_Regular,
                    fontSize: 16,
                    color: '#707070',
                  }}>
                  {toDate != null ? (monthsList[toDate.getMonth()] + " " + toDate.getDate() + " " + toDate.getFullYear()) : 'To Date'}
                </Text>
                <Image source={images.datePick} style={styles.datePick} />
              </TouchableOpacity>
            </View>

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

          <View>              
              <TouchableOpacity onPress={() => login()} style={styles.commonBtn}>
                <Text style={styles.loginText}>Search</Text>
              </TouchableOpacity>
          </View>

        </View>
      </View>
    </ScrollView>
  );
};
export default SmartMeterUsageHistory;
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#151833',
    paddingLeft: 10,
    paddingRight: 10,
  },
  mainView: {
    flexDirection: "row",
    flexWrap: "wrap",
    margin:5,
    borderRadius:23,
    marginTop: 10,
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
    flexDirection: "row",
    flex: 1,
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
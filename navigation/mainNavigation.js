import React, {Fragment, useEffect} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';

// import TokenScreen from '../screens/test/tokenScreen';
import WelcomeScreen from '../screens/welcomeScreen';
import SignIn from '../screens/user/signInScreen';
import SignUp from '../screens/user/signUpScreen';
import Dashboard from '../screens/user/dashboardScreen';
import AddNewHub from '../screens/centralhub/addNewHub';
import ConnectNewHubBT from '../screens/centralhub/connectNewHubBT';
import ConnectHubToWifi from '../screens/centralhub/connectHubToWifi';
import ConnectNewHubToWifi from '../screens/centralhub/connectNewHubToWifi';
import ConnectHubToCloud from '../screens/centralhub/connectHubToCloud';
import ConnectNewHubToCloud from '../screens/centralhub/connectNewHubToCloud';
import FinishHubSetup from '../screens/centralhub/finishHubSetup';
import StartMeterSetup from '../screens/smartmeter/startMeterSetup';
import ConnectNewMeterToBT from '../screens/smartmeter/connectNewMeterToBT';
import ConnectMeterToWifi from '../screens/smartmeter/connectMeterToWifi';
import FinishMeterSetup from '../screens/smartmeter/finishMeterSetup';
import SmartMeterDetail from '../screens/smartmeter/smartMeterDetail';
import SmartMeterNewPlan from '../screens/smartmeter/smartMeterNewPlan';
import SmartMeterPlanDetails from '../screens/smartmeter/smartMeterPlanDetails';
import SmartMeterInfo from '../screens/smartmeter/smartMeterInfo';
import SmartMeterUsageHistory from '../screens/smartmeter/smartMeterUsageHistory';
import BluetoothSwitch from '../screens/utils/bluetoothSwitch';

import DrawerNavigator from './drawerNavigation';

const Stack = createNativeStackNavigator();

const MainNavigator = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Fragment>
        {/*<Stack.Screen name="TokenScreen" component={TokenScreen} options={{headerShown: false}} />*/}
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown: false}} />
        <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}} />
        <Stack.Screen name="SignIn" component={SignIn} options={{headerShown: false}} />
        <Stack.Screen
          name="ToDashboard"
          component={DrawerNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="BTSwitch" component={BluetoothSwitch} options={{
          headerStyle: {
            backgroundColor: '#131524',
            borderColor: '#000',
            borderBottomWidth: 0,
            shadowColor: '#040509',
          },
          headerTitle:'Bluetooth Setting',
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }} />
        <Stack.Screen name="AddNewHub" component={AddNewHub} options={{
          headerStyle: {
            backgroundColor: '#131524',
            borderColor: '#000',
            borderBottomWidth: 0,
            shadowColor: '#040509',
          },
          headerTitle:'New Central Hub Setup Wizard',
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }} />
        <Stack.Screen name="ConnectNewHubBT" component={ConnectNewHubBT} options={{
          headerStyle: {
            backgroundColor: '#131524',
            borderColor: '#000',
            borderBottomWidth: 0,
            shadowColor: '#040509',
          },
          headerTitle:'New Central Hub Setup Wizard',
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }} />
        <Stack.Screen name="ConnectHubToWifi" component={ConnectHubToWifi} options={{
          headerStyle: {
            backgroundColor: '#131524',
            borderColor: '#000',
            borderBottomWidth: 0,
            shadowColor: '#040509',
          },
          headerTitle:'New Central Hub Setup Wizard',
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }} />
        <Stack.Screen name="ConnectNewHubToWifi" component={ConnectNewHubToWifi} options={{
          headerStyle: {
            backgroundColor: '#131524',
            borderColor: '#000',
            borderBottomWidth: 0,
            shadowColor: '#040509',
          },
          headerTitle:'New Central Hub Setup Wizard',
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }} />
        <Stack.Screen name="ConnectHubToCloud" component={ConnectHubToCloud} options={{
          headerStyle: {
            backgroundColor: '#131524',
            borderColor: '#000',
            borderBottomWidth: 0,
            shadowColor: '#040509',
          },
          headerTitle:'New Central Hub Setup Wizard',
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }} />
        <Stack.Screen name="ConnectNewHubToCloud" component={ConnectNewHubToCloud} options={{
          headerStyle: {
            backgroundColor: '#131524',
            borderColor: '#000',
            borderBottomWidth: 0,
            shadowColor: '#040509',
          },
          headerTitle:'New Central Hub Setup Wizard',
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }} />
        <Stack.Screen name="FinishHubSetup" component={FinishHubSetup} options={{
          headerStyle: {
            backgroundColor: '#131524',
            borderColor: '#000',
            borderBottomWidth: 0,
            shadowColor: '#040509',
          },
          headerTitle:'New Central Hub Setup Wizard',
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }} />
        <Stack.Screen name="StartMeterSetup" component={StartMeterSetup} options={{
          headerStyle: {
            backgroundColor: '#131524',
            borderColor: '#000',
            borderBottomWidth: 0,
            shadowColor: '#040509',
          },
          headerTitle:'New Smart Meter Setup Wizard',
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }} />
        <Stack.Screen name="ConnectNewMeterToBT" component={ConnectNewMeterToBT} options={{
          headerStyle: {
            backgroundColor: '#131524',
            borderColor: '#000',
            borderBottomWidth: 0,
            shadowColor: '#040509',
          },
          headerTitle:'New Smart Meter Setup Wizard',
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }} />
        <Stack.Screen name="ConnectMeterToWifi" component={ConnectMeterToWifi} options={{
          headerStyle: {
            backgroundColor: '#131524',
            borderColor: '#000',
            borderBottomWidth: 0,
            shadowColor: '#040509',
          },
          headerTitle:'New Smart Meter Setup Wizard',
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }} />
        <Stack.Screen name="FinishMeterSetup" component={FinishMeterSetup} options={{
          headerStyle: {
            backgroundColor: '#131524',
            borderColor: '#000',
            borderBottomWidth: 0,
            shadowColor: '#040509',
          },
          headerTitle:'New Smart Meter Setup Wizard',
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }} />
        <Stack.Screen name="SmartMeterDetail" component={SmartMeterDetail} options={{
          headerStyle: {
            backgroundColor: '#131524',
            borderColor: '#000',
            borderBottomWidth: 0,
            shadowColor: '#040509',
          },
          headerTitle:'Smart Meter Details',
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }} />
        <Stack.Screen name="SmartMeterNewPlan" component={SmartMeterNewPlan} options={{
          headerStyle: {
            backgroundColor: '#131524',
            borderColor: '#000',
            borderBottomWidth: 0,
            shadowColor: '#040509',
          },
          headerTitle:'Smart Meter New Plan',
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }} />
        <Stack.Screen name="SmartMeterPlanDetails" component={SmartMeterPlanDetails} options={{
          headerStyle: {
            backgroundColor: '#131524',
            borderColor: '#000',
            borderBottomWidth: 0,
            shadowColor: '#040509',
          },
          headerTitle:'Smart Meter Plan Detail',
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }} />
        <Stack.Screen name="SmartMeterInfo" component={SmartMeterInfo} options={{
          headerStyle: {
            backgroundColor: '#131524',
            borderColor: '#000',
            borderBottomWidth: 0,
            shadowColor: '#040509',
          },
          headerTitle:'Smart Meter Device Info',
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }} />
        <Stack.Screen name="SmartMeterUsageHistory" component={SmartMeterUsageHistory} options={{
          headerStyle: {
            backgroundColor: '#131524',
            borderColor: '#000',
            borderBottomWidth: 0,
            shadowColor: '#040509',
          },
          headerTitle:'Smart Meter Usage History',
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }} />
      </Fragment>
    </Stack.Navigator>
  );
};

// const Drawer = createDrawerNavigator();

// const MainNavigator = ({navigation}) => {
//   return (
//     <Drawer.Navigator useLegacyImplementation initialRouteName="Welcome">
//     </Drawer.Navigator>
//   );
// };

export default MainNavigator;
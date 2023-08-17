import * as React from 'react';
import {Image, View} from 'react-native';
import {createDrawerNavigator, DrawerContentScrollView,
  DrawerItemList, DrawerItem} from '@react-navigation/drawer';
import Dashboard from '../screens/user/dashboardScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();

function AppDrawerContent(props){
   return (
      <DrawerContentScrollView {...props} contentContainerStyle={{flex:1}}>
        <DrawerItemList {...props} />
        <View style={{flex:1,marginVertical:20}}>
          <DrawerItem label="Logout"
            onPress={()=>{
              AsyncStorage.clear();
              props.navigation.navigate("SignIn");
            }}
            style={{flex:1,justifyContent:'flex-end'}}
          />
        </View>
      </DrawerContentScrollView>
    );
  }

const DrawerNavigator = ({navigation}) => {
  return (
    <Drawer.Navigator drawerContent={props=><AppDrawerContent {...props} />}>
      <Drawer.Screen name="Dashboard" component={Dashboard} options={{
          headerStyle: {
            backgroundColor: '#131524',
            borderColor: '#000',
            borderBottomWidth: 0,
            shadowColor: '#040509',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }} />
      <Drawer.Screen name="Profile" component={Dashboard} options={{
          headerStyle: {
            backgroundColor: '#131524',
            borderColor: '#000',
            borderBottomWidth: 0,
            shadowColor: '#040509',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }} />
    </Drawer.Navigator>
  );
};
export default DrawerNavigator;
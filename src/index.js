// In App.js in a new project

import React, {createContext} from 'react';
import {View, Text, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// import Login from './src/index';
import Login from './pages/account/login';
import Regist from './pages/account/regist';
import Home from './pages/home';
import InfoUpload from './pages/infoUpload';
import PersonSetting from './pages/setting';
import History from './pages/history';
import Camera from './pages/camera/camera';
import BarCode from './pages/camera/barCode';

import {useToast} from 'native-base';

function InitScreen({navigation}) {
  return (
    <View
      style={{flex: 1, alignItems: 'center', justifyContent: 'space-evenly'}}>
      <Text>Home Screen</Text>
      <Button
        title="GO TO 登录 "
        onPress={() => navigation.navigate('Login')}
      />
      <Button
        title="GO TO 注册"
        onPress={() => navigation.navigate('Regist')}
      />
      <Button title="GO TO 首页" onPress={() => navigation.navigate('Home')} />
      <Button
        title="GO TO 信息上传页"
        onPress={() => navigation.navigate('InfoUpload')}
      />
    </View>
  );
}

const Stack = createStackNavigator();
export const ToastContext = createContext();
function Nav() {
  const toast = useToast();
  return (
    <ToastContext.Provider value={toast}>
      <NavigationContainer>
        <Stack.Navigator headerMode="none" initialRouteName="Login">
          <Stack.Screen
            name="Init"
            component={InitScreen}
            options={{title: 'Init'}}
          />
          <Stack.Screen name="Login" component={Login} toast={toast} />
          <Stack.Screen name="Regist" component={Regist} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="InfoUpload" component={InfoUpload} />
          <Stack.Screen name="Setting" component={PersonSetting} />
          <Stack.Screen name="Camera" component={Camera} />
          <Stack.Screen name="BarCode" component={BarCode} />
          <Stack.Screen name="History" component={History} />
        </Stack.Navigator>
      </NavigationContainer>
    </ToastContext.Provider>
  );
}

export default Nav;

import React from 'react';
import {View, StatusBar} from 'react-native';
import Nav from './src';
import {NativeBaseProvider} from 'native-base';

function App() {
  return (
    <NativeBaseProvider>
      <View style={{flex: 1}}>
        <StatusBar
          backgroundColor="transparent"
          translucent={true}
          barStyle="dark-content"
        />
        <Nav />
      </View>
    </NativeBaseProvider>
  );
}

export default App;

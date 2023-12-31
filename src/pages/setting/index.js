import React, {useEffect, useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  Image,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Button,
  Keyboard,
} from 'react-native';
const LOGO_URL = require('../../public/image/logo.png');
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
const navgateStrategy = {};

function MenuItem(props) {
  const {iconName, title, navigation} = props;
  return (
    <TouchableOpacity
      onPress={() => {
        if (title === '退出账号') {
          navigation.navigate('Login');
          return;
        }
        alert('功能待完善');
      }}>
      <View style={styles.menuItem}>
        <View style={{width: 20, alignItems: 'center'}}>
          <Icon name={iconName} size={18} color="#999999" />
        </View>
        <Text style={styles.menuText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default props => {
  const {navigation} = props;
  const [username, setusername] = useState('');
  useEffect(() => {
    AsyncStorage.getItem('username').then(res => {
      console.log(res);
      setusername(res);
    });

    return () => {};
  }, []);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: 70,
          top: 30,
          left: 20,
        }}
        onPressIn={() => {
          console.log(navigation);
          navigation.navigate('Home');
        }}>
        <Icon name="chevron-left" size={18} color="gray" />
        <Text
          style={{
            color: 'gray',
            fontWeight: 'bold',
            fontSize: 15,
            paddingLeft: 8,
          }}>
          返回
        </Text>
      </TouchableOpacity>
      <View style={styles.topView}>
        <Image style={styles.logo} source={LOGO_URL} />
      </View>

      <View style={styles.bottomView}>
        <View style={styles.bottomViewContent}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
            espory
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: '#808080',
              paddingTop: 5,
              paddingBottom: 20,
            }}>
            账号：{username}
          </Text>
          <MenuItem
            iconName={'lock'}
            title={'修改密码'}
            navigation={navigation}
          />
          <MenuItem
            iconName={'cogs'}
            title={'修改个人信息'}
            navigation={navigation}
          />
          <MenuItem
            iconName={'question-circle'}
            title={'关于我们'}
            navigation={navigation}
          />
          <MenuItem
            iconName={'reply'}
            title={'退出账号'}
            navigation={navigation}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  logo: {
    width: 76,
    height: 70,
    borderRadius: 0,
    position: 'absolute',
    bottom: -50,
    left: 40,
    zIndex: 999,
  },
  topView: {
    height: '30%',
  },
  bottomView: {
    height: '70%',
    backgroundColor: 'white',
    borderTopRightRadius: 500,
    borderTopLeftRadius: 500,
    transform: [{scaleX: 1.6}],
  },
  bottomViewContent: {
    transform: [{scaleX: 0.625}],
    paddingTop: 70,
    paddingLeft: 40,
  },
  menuItem: {
    paddingTop: 10,
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    color: '#505050',
    fontSize: 16,
    paddingLeft: 17,
    paddingBottom: 1,
  },
});

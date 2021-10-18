import React from 'react';
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

const navgateStrategy = {};

function MenuItem(props) {
  const {iconName, title} = props;
  return (
    <TouchableOpacity
      onPress={() => {
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

export default () => {
  return (
    <View style={styles.container}>
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
            工号：202102123490
          </Text>
          <MenuItem iconName={'lock'} title={'修改密码'} />
          <MenuItem iconName={'cogs'} title={'修改个人信息'} />
          <MenuItem iconName={'question-circle'} title={'关于我们'} />
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
    width: 70,
    height: 70,
    borderRadius: 100,
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

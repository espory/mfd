import React from 'react';
import {
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const LOGO_URL = require('../../public/image/logo.jpg');
const BG_IMG = require('../../public/image/bg.jpg');
const Home = props => {
  const {navigation} = props;
  return (
    <View style={styles.container}>
      <ImageBackground source={BG_IMG} style={styles.image}>
        <View style={styles.topPart}>
          <Image style={styles.logoImg} source={LOGO_URL} />
          <Text style={styles.appName}>表箱识别</Text>
        </View>
        <View style={styles.bottomPart}>
          <View style={styles.bottomUpload}>
            <TouchableOpacity
              style={styles.button}
              onPressIn={() => {
                navigation.navigate('InfoUpload');
              }}>
              <Icon name="camera" size={40} color="white" />
              <Text style={{color: 'white'}}>拍照上传</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomMenu}>
            <TouchableOpacity
              onPressIn={() => {
                navigation.navigate('Setting');
              }}>
              <Icon name="user" size={40} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity onPressIn={() => {}}>
              <Icon name="th-list" size={40} color="gray" />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },

  topPart: {
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30,
  },
  logoImg: {
    width: 90,
    height: 90,
    borderRadius: 20,
  },
  appName: {
    color: '#242424',
    fontWeight: 'bold',
    fontSize: 22,
    paddingTop: 20,
    paddingBottom: 20,
  },

  bottomPart: {
    height: '40%',
    backgroundColor: 'white',
    borderTopRightRadius: 500,
    borderTopLeftRadius: 500,
    transform: [{scaleX: 1.6}],
  },
  bottomUpload: {
    height: '70%',
    transform: [{scaleX: 0.625}],
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    backgroundColor: 'black',
    marginTop: '15%',
    height: 120,
    width: 120,
    borderRadius: 120,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingTop: 15,
    paddingBottom: 20,
  },

  bottomMenu: {
    flex: 1,
    transform: [{scaleX: 0.625}],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: '8%',
    paddingRight: '8%',
  },
});

export default Home;

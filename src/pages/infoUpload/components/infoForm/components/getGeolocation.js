import React, {useEffect} from 'react';
import {View, Text, StyleSheet, PermissionsAndroid} from 'react-native';
import {TextArea} from 'native-base';
// import Geolocation from '@react-native-community/geolocation';

export default function GetGeolocation(props) {
  useEffect(() => {
    async function getGeo() {
      const permissions = [PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION];
      const granteds = await PermissionsAndroid.requestMultiple(permissions);
      if (granteds['android.permission.ACCESS_FINE_LOCATION'] === 'granted') {
        console.log(123);
        // Geolocation.getCurrentPosition(info => console.log(info));
      } else {
        console.log('定位权限被禁止');
        // Toast.info('定位权限被禁止');
      }
    }
    getGeo();
  }, []);

  const {title} = props;
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.TextView}>
        <TextArea
          aria-label="t1"
          numberOfLines={4}
          placeholder="输入需补充的信息"
          style={styles.infoText}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    color: '#505050',
    paddingTop: 20,
    fontWeight: 'bold',
  },
  infoText: {
    borderColor: '#cccccc',
    backgroundColor: 'white',
  },
  TextView: {
    marginTop: 20,
  },
});

import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, PermissionsAndroid} from 'react-native';
import {Input} from 'native-base';
import {init, Geolocation, setNeedAddress} from 'react-native-amap-geolocation';

export default function GetGeolocation(props) {
  const {toast} = props;
  const [location, setlocation] = useState('未知地点');
  useEffect(() => {
    async function getGeo() {
      const permissions = [PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION];
      const granteds = await PermissionsAndroid.requestMultiple(permissions);
      if (granteds['android.permission.ACCESS_FINE_LOCATION'] === 'granted') {
        await init({
          android: 'e832841bc52d3e50e7c2185c79922cdf',
          // android: "043b24fe18785f33c491705ffe5b6935"
        });
        setNeedAddress(true);
        Geolocation.getCurrentPosition(
          ({location}) => {
            setlocation(location?.address || '未知地点');
          },
          err => {
            console.log(err);
            toast.show({
              title: '定位出现问题',
              status: 'error',
              placement: 'top',
              duration: 1500,
              isClosable: false,
              style: {
                width: 200,
              },
            });
          },
        );
      } else {
        toast.show({
          title: '定位权限被禁止',
          status: 'error',
          placement: 'top',
          duration: 1500,
          isClosable: false,
          style: {
            width: 200,
          },
        });
        console.log('定位权限被禁止');
        // Toast.info('定位权限被禁止');
      }
    }
    getGeo();
  }, [toast]);

  const {title} = props;
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.TextView}>
        <Input
          aria-label="t1"
          numberOfLines={1}
          placeholder="输入需补充的信息"
          value={location}
          style={styles.infoText}
          onChangeText={setlocation}
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
    fontSize: 10,
  },
  TextView: {
    marginTop: 20,
  },
});

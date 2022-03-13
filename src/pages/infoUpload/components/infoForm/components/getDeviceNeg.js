import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {Select, Input} from 'native-base';
import {Image} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useState} from 'react';

const errorTypes = [
  {label: '其他', value: '其他'},
  {label: '表箱锁坏', value: '表箱锁坏'},
  {label: '表箱门坏', value: '表箱门坏'},
  {label: '表箱倾斜', value: '表箱倾斜'},
  {label: '表箱无箱盖', value: '表箱无箱盖'},
  {label: '表箱无资产编号', value: '表箱无资产编号'},
  {label: '表黑屏', value: '表黑屏'},
  {label: '表未固定', value: '表未固定'},
  {label: '表无电', value: '表无电'},
  {label: '表无封印', value: '表无封印'},
];

export default function GetDeviceNeg(props) {
  const {
    title,
    onOpen,
    deviceOutImgUrl,
    setpickNegImg,
    setnegId,
    deviceNegInfo,
    setdeviceNegInfo,
  } = props;
  const [service, setService] = useState('');
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <Text style={styles.title}>{title}</Text>
      </View>
      {deviceNegInfo.map((item, index) => {
        const {url, upload_url, info, extra} = item;
        return (
          <View
            key={index}
            style={{
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              style={styles.cameraButton}
              onPress={() => {
                setpickNegImg();
                setnegId(index);
                onOpen();
              }}>
              {url ? (
                <Image
                  source={{
                    uri: url,
                  }}
                  style={styles.image}
                  PlaceholderContent={<ActivityIndicator color="white" />}
                />
              ) : (
                <>
                  <Text
                    style={{
                      position: 'absolute',
                      top: 10,
                      fontSize: 12,
                      color: 'gray',
                    }}>
                    故障电表
                  </Text>
                  <Icon name="plus" size={30} color="gray" />
                </>
              )}
            </TouchableOpacity>
            <View style={styles.select}>
              <Select
                selectedValue={info}
                accessibilityLabel="Choose Service"
                placeholder="选择错误类型"
                width={190}
                ml={3}
                mt={5}
                height={12}
                size="sm"
                onValueChange={itemValue => {
                  deviceNegInfo[index].info = itemValue;
                  if (itemValue !== '其他') {
                    deviceNegInfo[index].extra = '';
                  }
                  setdeviceNegInfo([...deviceNegInfo]);
                }}>
                {errorTypes.map(it => (
                  <Select.Item label={it.value} value={it.label} />
                ))}
                {/* <Select.Item label="你好" value={0} /> */}
              </Select>
              <View style={{}}>
                <Input
                  isDisabled={info !== '其他'}
                  value={extra}
                  onValueChange={value => {
                    deviceNegInfo[index].extra = value;
                    setdeviceNegInfo([...deviceNegInfo]);
                  }}
                  mt={3}
                  ml={3}
                  height={10}
                  size="sm"
                  maxWidth={190}
                  placeholder="输入错误原因"
                />
              </View>
            </View>
            <View>
              <TouchableOpacity
                style={{
                  marginLeft: 10,
                  marginTop: 20,
                }}
                onPress={() => {
                  deviceNegInfo.splice(index, 1);
                  setdeviceNegInfo([...deviceNegInfo]);
                }}>
                <Icon name="times" size={25} color="#CA1D03" />
              </TouchableOpacity>
            </View>
          </View>
        );
      })}

      <TouchableOpacity
        style={styles.addNegInfo}
        onPress={() => {
          setdeviceNegInfo([
            ...deviceNegInfo,
            {url: null, info: '其他', extra: ''},
          ]);
        }}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Icon name="plus" size={20} color="gray" />
          <Text
            style={{
              color: 'gray',
              marginLeft: 10,
            }}>
            新增故障行
          </Text>
        </View>
      </TouchableOpacity>
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
  select: {},
  addNegInfo: {
    marginTop: 20,
    backgroundColor: 'white',
    borderColor: '#cccccc',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    width: '100%',
    height: 40,
  },
  cameraButton: {
    marginTop: 20,
    backgroundColor: 'white',
    borderColor: '#cccccc',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    width: 100,
    height: 100,
  },
  image: {
    borderColor: '#FFFFFF',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    width: 100,
    height: 100,
  },
  closeIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});

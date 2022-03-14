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
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {useState} from 'react';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

const multiSelectIcons = {
  search: {
    name: 'search', // search input
    size: 24,
  },
  arrowUp: {
    name: 'keyboard-arrow-up', // dropdown toggle
    size: 22,
  },
  arrowDown: {
    name: 'keyboard-arrow-down', // dropdown toggle
    size: 22,
  },
  selectArrowDown: {
    name: 'keyboard-arrow-down', // select
    size: 24,
  },
  close: {
    name: 'close', // chip close
    size: 16,
  },
  check: {
    name: 'check', // selected item
    size: 16,
  },
  cancel: {
    name: 'cancel', // cancel button
    size: 18,
  },
};
const errorTypes = [
  // {label: '其他', value: '其他'},
  // {label: '表箱锁坏', value: '表箱锁坏'},
  // {label: '表箱门坏', value: '表箱门坏'},
  // {label: '表箱倾斜', value: '表箱倾斜'},
  // {label: '表箱无箱盖', value: '表箱无箱盖'},
  // {label: '表箱无资产编号', value: '表箱无资产编号'},
  // {label: '表黑屏', value: '表黑屏'},
  // {label: '表未固定', value: '表未固定'},
  // {label: '表无电', value: '表无电'},
  // {label: '表无封印', value: '表无封印'},
  // {
  //   name: '其他',
  //   id: 9,
  //   children: [
  //     {
  //       name: '手动填写补充',
  //       id: 999,
  //     },
  //   ],
  // },
  {
    name: '表箱问题',
    id: 1,
    // these are the children or 'sub items'
    children: [
      {
        name: '表箱锁坏',
        id: 100,
      },
      {
        name: '表箱门坏',
        id: 101,
      },
      {
        name: '表箱倾斜',
        id: 102,
      },
      {
        name: '表箱无箱盖',
        id: 103,
      },
      {
        name: '表箱无资产编号',
        id: 104,
      },
    ],
  },
  {
    name: '表箱问题',
    id: 2,
    // these are the children or 'sub items'
    children: [
      {
        name: '表黑屏',
        id: 200,
      },
      {
        name: '表未固定',
        id: 201,
      },
      {
        name: '表无电',
        id: 202,
      },
      {
        name: '表无封印',
        id: 203,
      },
    ],
  },
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
        const {url, upload_url, info, extra, id} = item;
        return (
          <View
            key={id}
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
            <View>
              <View
                style={{
                  width: 195,
                  marginLeft: 10,
                  marginTop: 5,
                }}>
                <SectionedMultiSelect
                  styles={{
                    selectToggle: {
                      marginTop: 15,
                      borderWidth: 1,
                      marginBottom: 5,
                      padding: 5,
                      paddingLeft: 10,
                      borderColor: '#cccccc',
                      borderRadius: 5,
                    },
                  }}
                  icons={multiSelectIcons}
                  items={errorTypes}
                  IconRenderer={MaterialIcon}
                  uniqueKey="id"
                  subKey="children"
                  selectText="选择故障原因"
                  showDropDowns={false}
                  readOnlyHeadings={true}
                  onSelectedItemsChange={e => {
                    deviceNegInfo[index].info = e;
                    setdeviceNegInfo([...deviceNegInfo]);
                    console.log(e);
                  }}
                  selectedItems={info}
                />
              </View>
              {/* <Select
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
              </Select> */}
              <View style={{}}>
                <Input
                  // isDisabled={!info.includes(999)}
                  value={extra}
                  onChangeText={value => {
                    deviceNegInfo[index].extra = value;
                    setdeviceNegInfo([...deviceNegInfo]);
                  }}
                  mt={2}
                  ml={3}
                  height={10}
                  size="sm"
                  maxWidth={190}
                  placeholder="其他故障（选填）"
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
            {
              url: null,
              info: [],
              extra: '',
              id: Math.random().toString(36).slice(2),
            },
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

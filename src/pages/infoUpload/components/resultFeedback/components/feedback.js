import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
// import {Input} from 'native-base';
import {InfoCompleteMock} from '../../infoForm/components/infoComplete';
export function Feedback(props) {
  const {navigation} = props;
  const {toast} = props;
  return (
    <View style={{flex: 1}}>
      <View style={styles.headerView}>
        <Text style={styles.mentionText}>问题反馈</Text>
        {/* <Input mx="3" placeholder="Input" w="75%" maxWidth="300px" /> */}
        <InfoCompleteMock title={'问题反馈'} />
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity
          style={styles.secondaryButton}
          title="登录"
          onPressIn={() => {
            navigation.navigate('History');
            // toast.show({
            //   title: '登录成功',
            //   status: 'success',
            //   placement: 'top',
            //   isClosable: false,
            // });
          }}>
          <Text style={{color: '#88afd5'}}>返回</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.mainButton}
          title="登录"
          onPressIn={() => {
            toast.show({
              title: '反馈成功',
              status: 'success',
              placement: 'top',
              isClosable: false,
              style: {
                width: 140,
              },
            });
            navigation.navigate('Home');
          }}>
          <Text style={{color: 'white'}}>提交</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerView: {
    // height: '25%',
    paddingTop: 50,
    paddingLeft: 25,
    // alignItems: 'center',
    width: '94%',
    // justifyContent: 'center',
  },
  mentionText: {
    color: '#505050',
    fontSize: 24,
    fontWeight: '900',
  },
  buttonView: {
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  mainButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#88afd5',
    width: '42%',
    height: 45,
    marginRight: '2%',
    borderWidth: 1,
    borderColor: '#88afd5',
    borderRadius: 3,
    padding: 10,
  },
  secondaryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderColor: '#88afd5',
    borderWidth: 1,
    width: '42%',
    height: 45,
    marginLeft: '2%',
    borderRadius: 3,
    padding: 10,
  },
});

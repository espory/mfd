import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
export function Success(props) {
  const {navigation} = props;
  return (
    <View style={{flex: 1}}>
      <View style={styles.headerView}>
        <Icon name="check-circle" size={70} color="#70c67d" />
        <Text style={styles.mentionText}>电表完好，接线合规</Text>
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity
          style={styles.secondaryButton}
          title="登录"
          onPressIn={() => {
            // toast.show({
            //   title: '登录成功',
            //   status: 'success',
            //   placement: 'top',
            //   isClosable: false,
            // });
          }}>
          <Text style={{color: '#88afd5'}}>查看历史记录</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.mainButton}
          title="登录"
          onPressIn={() => {
            // toast.show({
            //   title: '登录成功',
            //   status: 'success',
            //   placement: 'top',
            //   isClosable: false,
            // });
            navigation.pop();
          }}>
          <Text style={{color: 'white'}}>返回主页</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerView: {
    height: '55%',
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mentionText: {
    color: '#505050',
    fontSize: 24,
    fontWeight: '900',
    paddingTop: 20,
  },
  buttonView: {
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

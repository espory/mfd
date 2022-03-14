import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {VStack, Center, Heading, ScrollView} from 'native-base';
import {postUidSearch} from '../../service/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function History(props) {
  const {navigation} = props;
  const [history, sethistory] = useState([]);
  useEffect(() => {
    AsyncStorage.getItem('username').then(async username => {
      try {
        const res = await postUidSearch(username);
        console.log(res);
        if (res.code === 205) {
          sethistory([]);
          return;
        }
        sethistory(res?.data || []);
        // postUidSearch
      } catch (error) {
        console.error(error);
      }
    });

    return () => {};
  }, []);
  return (
    <>
      <ScrollView>
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
        <VStack space={4} alignItems="center">
          <Heading textAlign="center" mt="20" mb="10">
            {`历史提交：${history.length} 次`}
          </Heading>
          {history.map(({elecid, time}, index) => {
            const formatTime = time.split('.')[0].replace('T', ' ');
            const color = index % 2 === 0 ? 'info.50' : 'muted.50';
            return (
              <Center
                key={index}
                w="85%"
                h="100px"
                bg={color}
                rounded="md"
                shadow={3}>
                <View
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                  }}>
                  <Text
                    style={{
                      padding: 10,
                      paddingBottom: 0,
                      fontWeight: 'bold',
                    }}>
                    {formatTime}
                  </Text>
                  <Text
                    style={{
                      padding: 10,
                    }}>{`电表编号：${elecid}`}</Text>
                </View>
              </Center>
            );
          })}
          <View style={{height: 15}} />
        </VStack>
      </ScrollView>
    </>
  );
}

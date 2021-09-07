import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Image} from 'native-base';
import {Modal} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import Icon from 'react-native-vector-icons/FontAwesome';
export function Error(props) {
  const {setpage, PAGE_MAP, navigation} = props;
  const [showImage, setshowImage] = useState(false);
  const images = [
    {
      url: 'http://p2.ssl.cdn.btime.com/t0146b07304f1d210f5.jpg?size=837x562',
    },
  ];
  return (
    <View style={{flex: 1}}>
      <View style={styles.headerView}>
        <Icon name="exclamation-triangle" size={70} color="#faa755" />
        <Text style={styles.mentionText}>电表/接线，存在问题</Text>
        <Text style={styles.errorText}>
          电表第一根接线和第二根出现错位， 问题图片如下：
        </Text>
        <TouchableOpacity
          onPressIn={() => {
            setshowImage(true);
          }}>
          <Image
            style={styles.image}
            alt="fallback text"
            source={{
              uri: 'http://p2.ssl.cdn.btime.com/t0146b07304f1d210f5.jpg?size=837x562',
            }}
            fallbackSource={{
              uri: 'https://www.w3schools.com/css/img_lights.jpg',
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPressIn={() => {
            // toast.show({
            //   title: '登录成功',
            //   status: 'success',
            //   placement: 'top',
            //   isClosable: false,
            // });
            navigation.pop();
          }}>
          <Text style={{color: '#88afd5'}}>放弃提交</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.mainButton}
          onPressIn={() => {
            // toast.show({
            //   title: '登录成功',
            //   status: 'success',
            //   placement: 'top',
            //   isClosable: false,
            // });
            setpage(PAGE_MAP.INFO);
          }}>
          <Text style={{color: 'white'}}>前去修改</Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={showImage}
        animationType={'slide'}
        onRequestClose={() => {
          setshowImage(false);
        }}
        transparent={true}>
        <ImageViewer
          imageUrls={images}
          enableSwipeDown={true}
          swipeDownThreshold={50}
          useNativeDriver={true}
          renderIndicator={() => (
            <Text
              style={{
                alignSelf: 'center',
                position: 'absolute',
                top: 50,
                color: 'gray',
              }}>
              下滑退出
            </Text>
          )}
          onClick={() => {
            setshowImage(false);
          }}
          onSwipeDown={() => {
            setshowImage(false);
          }}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  headerView: {
    height: '80%',
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
  errorText: {
    color: '#ff0000',
    width: '63%',
    fontSize: 14,
    paddingTop: 20,
  },
  image: {
    marginTop: 20,
    width: 300,
    height: 300,
    resizeMode: 'cover',
    justifyContent: 'center',
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

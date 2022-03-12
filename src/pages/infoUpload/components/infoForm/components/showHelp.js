import React from 'react'; // , {useEffect, useState}
import {Image, View, Text} from 'react-native';
import {Modal} from 'native-base';
// import axios from 'axios';

const STANDARD_IN = require('../../../../../public/image/standard_in.jpg');
const STANDARD_OUT = require('../../../../../public/image/standard_out.jpg');
const STANDARD_CODE = require('../../../../../public/image/standard_code.png');
function ShowHelp(props) {
  const {showModal, setShowModal} = props;
  return (
    <>
      <Modal isOpen={showModal}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton
            onPressIn={() => {
              setShowModal(false);
            }}
          />
          <Modal.Header>帮助</Modal.Header>
          <Modal.Body>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                paddingBottom: 6,
              }}>
              表箱外壳拍摄，规范示例
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                color: 'brown',
                paddingBottom: 6,
              }}>
              照片拍摄时, 请尽量保证清晰, 避免出现反光
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                color: 'brown',
                paddingBottom: 10,
              }}>
              正面拍摄、角度不要倾斜、拍摄完整不要有缺漏
            </Text>
            <View
              style={{
                alignItems: 'center',
              }}>
              <Image
                source={STANDARD_OUT}
                style={{
                  width: 300,
                  height: 370,
                }}
                resizeMode="contain"
              />
            </View>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                paddingTop: 15,
                paddingBottom: 6,
              }}>
              表箱内部拍摄，规范示例
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                color: 'brown',
                paddingBottom: 6,
              }}>
              照片拍摄时, 请尽量保证清晰, 避免出现反光
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                color: 'brown',
                paddingBottom: 10,
              }}>
              正面拍摄、角度不要倾斜、拍摄完整不要有缺漏
            </Text>
            <View
              style={{
                alignItems: 'center',
              }}>
              <Image
                source={STANDARD_IN}
                style={{
                  width: 300,
                  height: 370,
                }}
                resizeMode="contain"
              />
            </View>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                paddingTop: 15,
                paddingBottom: 6,
              }}>
              设备编码扫描，规范示例
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                color: 'brown',
                paddingBottom: 10,
              }}>
              扫描时, 请尽量将扫描框对准二维码
            </Text>
            <View
              style={{
                alignItems: 'center',
              }}>
              <Image
                source={STANDARD_CODE}
                style={{
                  width: 300,
                  height: 370,
                }}
                resizeMode="contain"
              />
            </View>
          </Modal.Body>
          <Modal.Footer />
        </Modal.Content>
      </Modal>
    </>
  );
}

export default ShowHelp;

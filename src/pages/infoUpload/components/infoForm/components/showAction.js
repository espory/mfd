import React from 'react';
import {Actionsheet} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {pickType, deviceCodeType} from '../index';
import {postJudgePicture} from '../../../../../service/index.js';

import AsyncStorage from '@react-native-async-storage/async-storage';

function ShowAction(props) {
  const {
    isOpen,
    onClose,
    pickImgType,
    launchImageLibrary,
    setImage,
    setdeviceCode,
    toast,
    navigation,
    setloading,
  } = props;
  const actionStrategy = {
    [pickType.OutDevice]: {
      item1: {
        itemTitle: '拍照',
        itemIcon: <Icon name="camera" size={30} color="black" />,
        onClick: () => {
          setImage[pickImgType]({});
          // setshowCamera(true);
          navigation.navigate('Camera', {
            mention: '请将表箱置于标注框内',
            setdeviceImgUrl: obj => {
              const {url, upload_url} = obj;
              setImage[pickImgType]({url, upload_url});
            },
            isCorrectImg: isCorrectImg(1),
            toast: toast,
          });
          onClose();
        },
      },
      item2: {
        itemTitle: '从相册中选取',
        itemIcon: <Icon name="image" size={30} color="black" />,
        onClick: () => {
          onClose();
          launchImageLibrary({}, async res => {
            if (!res.assets) {
              return;
            }
            setloading(true);
            const uri = res?.assets?.length && res.assets[0].uri;
            const rs = await isCorrectImg(1)(uri);
            console.log(rs);
            if (rs.code === 201) {
              setImage[pickImgType]({url: uri, upload_url: rs.data});
            } else {
              toast.show({
                title: '照片拍摄不合规，请重新选择',
                status: 'error',
                placement: 'top',
                duration: 3000,
                isClosable: false,
                style: {
                  width: 240,
                },
              });
            }
            setloading(false);
          });
        },
      },
    },
    [pickType.InDevice]: {
      item1: {
        itemTitle: '拍照',
        itemIcon: <Icon name="camera" size={30} color="black" />,
        onClick: () => {
          setImage[pickImgType]({});
          // setshowCamera(true);
          navigation.navigate('Camera', {
            mention: '请将表箱置于标注框内',
            setdeviceImgUrl: obj => {
              const {url, upload_url} = obj;
              setImage[pickImgType]({url, upload_url});
            },
            isCorrectImg: isCorrectImg(2),
            toast: toast,
          });
          onClose();
        },
      },
      item2: {
        itemTitle: '从相册中选取',
        itemIcon: <Icon name="image" size={30} color="black" />,
        onClick: () => {
          onClose();
          launchImageLibrary({}, async res => {
            if (!res.assets) {
              return;
            }
            console.log(res);
            setloading(true);
            const uri = res?.assets?.length && res.assets[0].uri;
            const rs = await isCorrectImg(1)(uri);
            console.log(rs);

            if (rs.code === 201) {
              setImage[pickImgType]({url: uri, upload_url: rs.data});
            } else {
              toast.show({
                title: '照片拍摄不合规，请重新选择',
                status: 'error',
                placement: 'top',
                duration: 3000,
                isClosable: false,
                style: {
                  width: 240,
                },
              });
            }
            setloading(false);
          });
        },
      },
    },
    [pickType.BarCode]: {
      item1: {
        itemTitle: '扫描二维码获取',
        itemIcon: <Icon name="camera" size={30} color="black" />,
        onClick: () => {
          // setshowCamera(true);
          navigation.navigate('BarCode', {
            setdeviceCode: code => {
              setdeviceCode({type: deviceCodeType.Result, value: code});
            },
            toast: toast,
          });
          onClose();
        },
      },
      item2: {
        itemTitle: '手动输入',
        itemIcon: <Icon name="pencil-square-o" size={30} color="black" />,
        onClick: () => {
          setdeviceCode({type: deviceCodeType.Input, value: ''});
          onClose();
        },
      },
    },
  };
  const {item1, item2} = actionStrategy[pickImgType] || {};
  return (
    <>
      <Actionsheet
        isOpen={isOpen}
        onClose={onClose}
        disableOverlay={false}
        hideDragIndicator={true}>
        <Actionsheet.Content>
          <Actionsheet.Item
            startIcon={item1?.itemIcon}
            onPressIn={item1?.onClick}>
            {item1?.itemTitle}
          </Actionsheet.Item>
          <Actionsheet.Item
            startIcon={item2?.itemIcon}
            onPressIn={item2?.onClick}>
            {item2?.itemTitle}
          </Actionsheet.Item>
          <Actionsheet.Item
            onPressIn={onClose}
            startIcon={<Icon name="times" size={30} color="black" />}>
            取消
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
}

const isCorrectImg = pic_type => {
  return async uri => {
    const username = await AsyncStorage.getItem('username');
    return await postJudgePicture(uri, username, pic_type);
  };
};

export default ShowAction;

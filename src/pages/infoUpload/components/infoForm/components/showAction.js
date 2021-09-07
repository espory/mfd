import React from 'react';
import {Actionsheet} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {pickType, deviceCodeType} from '../index';

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
  } = props;
  const actionStrategy = {
    [pickType.OutDevice]: {
      item1: {
        itemTitle: '拍照',
        itemIcon: <Icon name="camera" size={30} color="black" />,
        onClick: () => {
          setImage[pickImgType](null);
          // setshowCamera(true);
          navigation.navigate('Camera', {
            mention: '请将表箱置于标注框内',
            setdeviceImgUrl: uri => {
              setImage[pickImgType](uri);
            },
          });
          onClose();
        },
      },
      item2: {
        itemTitle: '从相册中选取',
        itemIcon: <Icon name="image" size={30} color="black" />,
        onClick: () => {
          launchImageLibrary({}, res => {
            const uri = res?.assets?.length && res.assets[0].uri;
            setImage[pickImgType](uri);
            onClose();
          });
        },
      },
    },
    [pickType.InDevice]: {
      item1: {
        itemTitle: '拍照',
        itemIcon: <Icon name="camera" size={30} color="black" />,
        onClick: () => {
          setImage[pickImgType](null);
          // setshowCamera(true);
          navigation.navigate('Camera', {
            mention: '请将表箱置于标注框内',
            setdeviceImgUrl: uri => {
              setImage[pickImgType](uri);
            },
          });
          onClose();
        },
      },
      item2: {
        itemTitle: '从相册中选取',
        itemIcon: <Icon name="image" size={30} color="black" />,
        onClick: () => {
          launchImageLibrary({}, res => {
            const uri = res?.assets?.length && res.assets[0].uri;
            setImage[pickImgType](uri);
            onClose();
          });
        },
      },
    },
    [pickType.BarCode]: {
      item1: {
        itemTitle: '拍照获取',
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

export default ShowAction;

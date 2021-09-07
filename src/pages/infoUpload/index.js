import React, {useState, useContext} from 'react';
import {View} from 'react-native';
import {Success, Error} from './components/resultFeedback/index';
import InfoForm from './components/infoForm';
import {PAGE_MAP} from '../../common/utils';
import {ToastContext} from '../../index';

function InfoUpload(props) {
  const toast = useContext(ToastContext);
  const {navigation} = props;
  const [page, setpage] = useState(PAGE_MAP.INFO);
  let ShowComponent;
  switch (page) {
    case PAGE_MAP.INFO:
      ShowComponent = InfoForm;
      break;
    case PAGE_MAP.RESULT_SUCCESS:
      ShowComponent = Success;
      break;
    case PAGE_MAP.RESULT_ERROR:
      ShowComponent = Error;
      break;
    default:
      break;
  }
  return (
    <View style={{flex: 1}}>
      <ShowComponent
        toast={toast}
        navigation={navigation}
        setpage={setpage}
        PAGE_MAP={PAGE_MAP}
      />
    </View>
  );
}

export default InfoUpload;

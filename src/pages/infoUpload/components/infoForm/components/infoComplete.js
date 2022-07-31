import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TextArea, KeyboardAvoidingView} from 'native-base';

export default function InfoComplete(props) {
  const {title} = props;
  const {textAreaValue, setTextAreaValue} = props;
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <KeyboardAvoidingView style={styles.TextView}>
        <TextArea
          aria-label="t1"
          numberOfLines={4}
          placeholder="输入需补充的信息"
          style={styles.infoText}
          value={textAreaValue}
          onChangeText={setTextAreaValue}
        />
      </KeyboardAvoidingView>
    </View>
  );
}

export function InfoCompleteMock(props) {
  const {title} = props;
  const {textAreaValue, setTextAreaValue} = props;
  return (
    <View>
      {/* <Text style={styles.title}>{title}</Text> */}
      <KeyboardAvoidingView style={styles.TextView}>
        <TextArea
          aria-label="t1"
          numberOfLines={4}
          placeholder="输入需反馈的信息"
          style={styles.infoText}
          value={textAreaValue}
          onChangeText={setTextAreaValue}
        />
      </KeyboardAvoidingView>
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
  infoText: {
    borderColor: '#cccccc',
    backgroundColor: 'white',
  },
  TextView: {
    marginTop: 20,
  },
});

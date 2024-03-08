import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default () => {
  return (
    <View style={styles.root}>
      <View style={[styles.subView]}>
        <Text style={[styles.text]}>简体中文 111</Text>
      </View>
      <View style={[styles.subView, styles.subView_bgcolor_2]}>
        <Text style={[styles.text2]}>简体中文 222</Text>
      </View>
      <View style={[styles.subView, styles.subView_bgcolor_3]}>
        <Text style={[styles.text3]}>
          简体中文 333
          <Text style={[styles.box]}> box</Text>
          <Text style={[styles.box]}> box2</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    height: '100%',
    backgroundColor: 'lightgray',
    justifyContent: 'center',
  },
  subView: {
    width: 100,
    height: 100,
    backgroundColor: 'lightblue',
    flexGrow: 1,
  },
  subView_bgcolor_2: {
    backgroundColor: 'lightgreen',
    flexGrow: 2,
  },
  subView_bgcolor_3: {
    backgroundColor: 'lightcoral',
    flexGrow: 3,
  },
  text: {
    fontSize: 14,
    fontWeight: 'normal',
  },
  text2: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'impact',
    backgroundColor: 'lightyellow',
  },
  text3: {
    fontSize: 14,
    fontWeight: 'normal',
    fontFamily: 'impact',
    textAlign: 'center',
    backgroundColor: 'lightgreen',
    height: 40,
    textAlignVertical: 'center',
    textDecorationStyle: 'dotted',
    textDecorationLine: 'underline',
    textShadowColor: '#808080',
    textShadowOffset: {width: 2, height: 4},
    textShadowRadius: 4,
  },
  box: {
    fontSize: 14,
    fontWeight: 'normal',
    fontFamily: 'impact',
    backgroundColor: 'lightyellow',
    marginTop: 10,
  },
});

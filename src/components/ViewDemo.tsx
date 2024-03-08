import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';

export default () => {
  const inputRef = React.useRef<TextInput>(null);
  React.useEffect(() => {
    setTimeout(() => {
      setTimeout(() => {}, 3000);
    }, 3000);
  }, []);

  return (
    <View style={styles.root}>
      <TextInput
        ref={inputRef}
        style={styles.input}
        // autoFocus={true}
        blurOnSubmit={false}
        caretHidden={false}
        editable={true}
        keyboardType="number-pad"
        returnKeyType="go"
        defaultValue="你好世界我是张三言叶"
        // selection={{start: 2, end: 5}}
        selectionColor="green"
        // selectTextOnFocus={true}
        secureTextEntry={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    height: '100%',
  },
  input: {
    width: '100%',
    height: 44,
    borderWidth: 1,
    backgroundColor: 'white',
    color: 'red',
    fontSize: 20,
  },
});

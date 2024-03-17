import React, {useEffect, useRef} from 'react';
import {
  Button,
  View,
  StyleSheet,
  Keyboard,
  TextInput,
  Animated,
  Easing,
  LayoutAnimation,
} from 'react-native';

export default () => {
  const [showBox, setShowBox] = React.useState(false);
  const onPress = () => {
    // 在改变布局之前使用布局动画, 会自动根据布局变化计算动画终点应用动画;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowBox(!showBox);
  };
  return (
    <View style={styles.root}>
      <Button title="Test API" onPress={onPress} />
      {showBox && <View style={[styles.box]} />}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 100,
    height: 100,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'red',
    backgroundColor: 'lightblue',
    marginTop: 20,
  },
});

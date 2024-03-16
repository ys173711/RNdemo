import React, {useEffect, useRef} from 'react';
import {
  Button,
  View,
  StyleSheet,
  Keyboard,
  TextInput,
  Animated,
  Easing,
} from 'react-native';
// import {useBackHandler} from '@react-native-community/hooks';

export default () => {
  const animatedValue = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
  const animatedStyle = {
    transform: [{translateX: animatedValue.x}, {translateY: animatedValue.y}],
  };
  const animation = Animated.timing(animatedValue, {
    toValue: {x: 100, y: 100},
    duration: 1000,
    useNativeDriver: false,
    easing: Easing.linear,
  });

  const onPress = () => {
    animation.start();
  };

  return (
    <View>
      <Button title="Test API" onPress={onPress} />
      <Animated.View style={[styles.box, animatedStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'red',
    backgroundColor: 'lightblue',
    marginTop: 100,
  },
});

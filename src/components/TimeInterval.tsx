import React from 'react';
// import type {ReactElement, ReactNode} from 'react'
import {View, Text, StyleSheet} from 'react-native';

export default () => {
  const [count, setCount] = React.useState(0);

  /* React.useEffect(() => {
    const timer = setInterval(() => {
      setCount(count + 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }); */
  // }, []); // 传递空数组，eslint react会报错, 会导致计数器定格在1
  // 另一种:
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []); // setCount参数写成getter这样就不会报错了

  return (
    <View style={style.container}>
      <View>
        <Text>RN计数器</Text>
      </View>
      <Text style={style.color}>{count}</Text>
    </View>
  );
};

// 创建样式表
const style = StyleSheet.create({
  container: {width: 100, height: 100, backgroundColor: 'lightgray'},
  color: {color: 'blue', fontSize: 30},
});

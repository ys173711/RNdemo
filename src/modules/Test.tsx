import React, {useMemo} from 'react';
import {Text, View} from 'react-native';

export default () => {
  const [data, setData] = React.useState([]);

  const totalAmount = useMemo(() => {
    return data.reduce((acc, item) => acc + item.amount, 0);
  }, [data]);
  return (
    <View>
      <Text>Test</Text>
      <View>
        <View>Total Amount: {totalAmount}</View>
        <Text>...</Text>
        <Text>...</Text>
        <Text>...</Text>
      </View>
    </View>
  );
};

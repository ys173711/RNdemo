/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
// import type {PropsWithChildren} from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
// import TimeInterval from './src/components/TimeInterval';
import UserSetting from './src/components/UserSetting';
import TestApi from './src/components/TestApi';

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      {/* <TimeInterval /> */}
      {/* <UserSetting /> */}
      <TestApi />
    </SafeAreaView>
  );
}

// const style = StyleSheet.create({});

export default App;

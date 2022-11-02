import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {Text, LogBox, StyleSheet} from 'react-native';
import MainStackNavigator from './navigation/MainStackNavigator';

const App = () => {
  useEffect(() => {
    LogBox.ignoreLogs([
      'ViewPropTypes will be removed',
      'ColorPropType will be removed',
    ]);
  }, []);

  return <MainStackNavigator />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;

import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  StatusBar,
  View,
} from 'react-native';
import fetchRequest from '../../utils/fetch-request';

const AuthLoading = ({ navigation }) => {
  useEffect(() => {
    _checkToken();
  }, []);

  const _checkToken = async () => {
    const res = await fetchRequest('/api/user');
    if (res.status !== 200 || res.ok !== true) {
      navigation.navigate('login');
    } else {
      navigation.navigate('record');
    }
  };

  return (
    <View>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  )
}

export default AuthLoading;
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
    const res = await fetchRequest('http://localhost:3100/api/user');
    alert(JSON.stringify(res))
    if (res.status !== 200 || res.ok !== true) {
      navigation.navigate('login');
    } else {
      navigation.navigate('home');
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
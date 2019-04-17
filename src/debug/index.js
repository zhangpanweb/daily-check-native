import React from 'react';
import { View, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const Debug = ({ navigation }) => {
  const alertCookie = async () => {
    const cookie = await AsyncStorage.getItem('cookie');
    alert(JSON.stringify(cookie));
  }

  const clearCookie = async () => {
    await AsyncStorage.removeItem('cookies');
    await AsyncStorage.removeItem('cookie')
  }

  return (
    <View>
      <Button
        title="Go to login"
        onPress={() => navigation.navigate('login')}
      />
      <Button
        title="Alert cookies"
        onPress={alertCookie}
      />
      <Button
        title="Clear cookies"
        onPress={clearCookie}
      />
    </View>
  )
};

Debug.navigationOptions = {
  title: 'Debug'
}

export default Debug;
import React from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const Home = ({ navigation }) => {
  const alertCookie = async () => {
    const cookies = await AsyncStorage.getItem('cookies');
    alert(JSON.stringify(cookies));
  }

  return (
    <View>
      <Text>Home Page</Text>
      <Button
        title="Go to login"
        onPress={() => navigation.navigate('login')}
      />
      <Button
        title="Alert cookies"
        onPress={alertCookie}
      />
    </View>
  )
};

Home.navigationOptions = ({ navigation }) => ({
  title: '打卡',
  headerRight: (
    <Button
      title='debug'
      onPress={() => navigation.navigate('debug')}
    />
  )
})

export default Home;
import React from 'react';
import { View, Text, Button } from 'react-native';

const Home = ({ navigation }) => {
  return (
    <View>
      <Text>Home Page</Text>
      <Button
        title="Go to login"
        onPress={() => navigation.navigate('login')}
      />
    </View>
  )
};

Home.navigationOptions = {
  title: '打卡'
}

export default Home;
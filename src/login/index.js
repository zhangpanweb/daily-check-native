import React from 'react';
import { View, Text, Button } from 'react-native';

const Login = ({ navigation }) => {
  return (
    <View>
      <Text>Login Page</Text>
      <Button
        title="success"
        onPress={() => navigation.navigate('home')}
      />
    </View>
  )
}

Login.navigationOptions = {
  title: '登录',
  headerRight: (
    <Button
      title='注册'
      onPress={() => { }}
    />
  )
}

export default Login;
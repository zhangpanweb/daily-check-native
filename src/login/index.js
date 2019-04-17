import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import fetchRequest from '../../utils/fetch-request';

const Login = ({ navigation }) => {
  const [loginOrRegist, setLoginOrRegist] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const hanldeUsernameInput = (text) => {
    setUsername(text);
    setErrorMessage('');
  };

  const handlePasswordInput = (text) => {
    setPassword(text);
    setErrorMessage('');
  };

  const handleLoginOrRegist = async () => {
    if (!username || !password) {
      setErrorMessage('请输入用户名和密码');
      return;
    }

    let res = {};
    if (loginOrRegist === 'login') {
      res = await fetchRequest('http://localhost:3100/api/user/login', {
        method: 'POST',
        body: JSON.stringify({
          name: username,
          password
        })
      })
    } else {
      result = await axios.post('/api/user/register', {
        name: username,
        password
      });
    }

    const result = await res.json()
    if (res.status !== 200 || result.responseStatus !== 'ok') {
      setErrorMessage(result.message);
    } else {
      const cookies = res.headers.get('set-cookie');
      AsyncStorage.setItem('cookie', cookies);

      navigation.navigate('home')
    }
  };

  const handleSwitchLoginAndRegist = () => {
    if (loginOrRegist === 'login') {
      setLoginOrRegist('regist');
    } else {
      setLoginOrRegist('login');
    }
  };

  return (
    <View className="login-container">
      <View className="content-wrapper">
        <TextInput
          className="username"
          placeholder="请输入账号"
          onChangeText={(text) => hanldeUsernameInput(text)}
        />
        <TextInput
          placeholder="请输入密码"
          onChangeText={(text) => handlePasswordInput(text)}
        />
        <Text className="tip">{errorMessage}</Text>
        <Button
          title={`${loginOrRegist === 'regist' ? '注册' : '登录'}`}
          onPress={handleLoginOrRegist}
        />
      </View>
    </View>

  );
};

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
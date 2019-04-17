import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import fetchRequest from '../../utils/fetch-request';

const Login = ({ navigation }) => {
  const [loginOrRegist, setLoginOrRegist] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    navigation.setParams({
      loginOrRegist,
      handleSwitchLoginAndRegist
    })
  }, [loginOrRegist])

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
      res = await fetchRequest('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({
          name: username,
          password
        })
      })
    } else {
      res = await fetchRequest('/api/user/register', {
        method: 'POST',
        body: JSON.stringify({
          name: username,
          password
        })
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
    setErrorMessage('');
    if (loginOrRegist === 'login') {
      setLoginOrRegist('regist');
    } else {
      setLoginOrRegist('login');
    }
  };

  return (
    <View className="login-container" style={styles.container}>
      <TextInput
        style={styles.input}
        className="username"
        placeholder="请输入账号"
        onChangeText={(text) => hanldeUsernameInput(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="请输入密码"
        onChangeText={(text) => handlePasswordInput(text)}
      />
      <Text className="tip" style={styles.errorText}>{errorMessage}</Text>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLoginOrRegist}
      >
        <Text style={styles.buttonText}>{loginOrRegist === 'regist' ? '注册' : '登录'}</Text>
        {/* <Text style={{}}></Text> */}
      </TouchableOpacity>

    </View>
  );
};

Login.navigationOptions = ({ navigation }) => {
  const isLogin = navigation.getParam('loginOrRegist') === 'login';
  const pageTitle = isLogin ? '登录' : '注册';
  const buttonTitle = isLogin ? '注册' : '登录';

  const handleSwitchLoginAndRegist = navigation.getParam('handleSwitchLoginAndRegist');

  return {
    title: pageTitle,
    headerRight: (
      <Button
        title={buttonTitle}
        type='outline'
        onPress={() => handleSwitchLoginAndRegist()}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 30
  },
  input: {
    width: 200,
    height: 35,
    marginTop: 20,
  },
  errorText: {
    height: 30,
    marginTop: 20
  },
  loginButton: {
    width: 200,
    height: 50,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 3
  },
  buttonText: {
    lineHeight: 50,
    textAlign: 'center'
  }
})

export default Login;
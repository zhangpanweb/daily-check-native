import React from 'react';
import {
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
} from 'react-navigation';

import Home from '../home';
import Record from '../record';
import Login from '../login';
import Setting from '../setting';
import AuthLoading from '../auth-loading';
import Debug from '../debug';

import TabBarIcon from './tab-bar-icon';

const RecordStack = createStackNavigator({
  record: {
    screen: Record
  },
  setting: {
    screen: Setting
  }
})
RecordStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

const HomeStack = createStackNavigator({
  home: Home
})

const MainStack = createBottomTabNavigator({
  home: HomeStack,
  record: RecordStack
}, {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        return <TabBarIcon routeName={routeName} focused={focused} />
      },
    }),
    tabBarOptions: {
      showLabel: false
    }
  })

const LoginStack = createStackNavigator({
  login: {
    screen: Login //
  }
})

const debugStack = createStackNavigator({
  debug: Debug
})

const rootStack = createSwitchNavigator({
  authLoading: AuthLoading,
  main: MainStack,
  login: LoginStack,
  debug: debugStack
}, {
    mode: 'modal',
    initialRouteName: 'authLoading'
  });


const AppContainer = createAppContainer(rootStack);

export default AppContainer;
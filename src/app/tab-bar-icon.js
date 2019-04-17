import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeIcon = ({ focused }) => (
  <React.Fragment>
    <Text style={[styles.imgText, focused ? styles.blue : null]}>&#xe7a8;</Text>
    <Text style={[focused ? styles.blue : null]}>打卡</Text>
  </React.Fragment>
)

const RecordIcon = ({ focused }) => (
  <React.Fragment>
    <Text style={[styles.imgText, focused ? styles.blue : null]}>&#xe7d4;</Text>
    <Text style={[focused ? styles.blue : null]}>成就</Text>
  </React.Fragment>
)

const TabBarIcon = ({ routeName, focused }) => {
  return (
    <View style={styles.container}>
      {routeName === 'home' ? <HomeIcon focused={focused} /> : <RecordIcon focused={focused} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgText: {
    fontFamily: "iconfont",
    fontSize: 25,
  },
  blue: {
    color: '#007AFF'
  }
})

export default TabBarIcon;
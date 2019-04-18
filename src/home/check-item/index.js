import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CheckItem = ({ checkItem }) => {
  if (!checkItem) return;

  const completedImg = <Text style={[styles.img, styles.blue]}>&#xe77d;</Text>
  const notCompletedImg = <Text style={styles.img}>&#xe77e;</Text>

  return (
    <View style={styles.container}>
      {checkItem.isCompleted ? completedImg : notCompletedImg}
      <Text style={checkItem.isCompleted ? styles.blue : null}>
        {checkItem.name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  },
  img: {
    fontFamily: "iconfont",
    fontSize: 55,
    marginBottom: 10
  },
  blue: {
    color: '#007AFF'
  }
})

export default CheckItem;

import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import fetchRequest from '../../utils/fetch-request';

import CheckIem from './check-item';

const Home = ({ navigation }) => {
  const [todayCheckItems, setTodayCheckItems] = useState([]);

  useEffect(() => {
    _getTodayCheckItems();
  }, []);

  const handleClickItem = async (index) => {
    const checkItem = todayCheckItems[index];
    if (checkItem && checkItem.isCompleted) {
      return;
    }

    Alert.alert(
      '确认打卡',
      '是否确认打卡呢？',
      [{
        text: '取消',
        onPress: () => { }
      }, {
        text: '确定',
        onPress: () => doCheckItem(index)
      }]
    )
  }

  const doCheckItem = async (index) => {
    await fetchRequest('/api/check_record', {
      method: 'POST',
      body: JSON.stringify({
        checkItemId: todayCheckItems[index].id
      })
    })

    const newTodayCheckItems = todayCheckItems.concat([]);
    newTodayCheckItems[index].isCompleted = true;
    setTodayCheckItems(newTodayCheckItems);
  }

  const _getTodayCheckItems = async () => {
    const res = await fetchRequest('/api/check_record/today');
    const result = await res.json();
    setTodayCheckItems(result);
  };

  return (
    <View style={styles.container}>
      {todayCheckItems.map((checkItem, index) => {
        return (
          <TouchableOpacity
            key={checkItem.id}
            onPress={() => { handleClickItem(index) }}
          >
            <CheckIem checkItem={checkItem} />
          </TouchableOpacity>
        )
      })}
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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 300,
    marginLeft: 'auto',
    marginRight: 'auto',
  }
})

export default Home;
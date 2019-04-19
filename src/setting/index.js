import React, { useEffect, useReducer } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, AlertIOS, TextInput } from 'react-native';
import fetchRequest from '../../utils/fetch-request';

const Setting = ({ navigation }) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case 'edit':
        const newState = state.concat([]);
        newState[action.index] = action.checkItem;
        return newState;
      case 'add':
        return state.concat(action.checkItem);
      default:
        return state;
    }
  }

  const [checkItems, dispatchCheckItems] = useReducer(reducer, []);

  useEffect(() => {
    _getCheckItems();
    navigation.setParams({ handleAddItem })
  }, []);

  const handleOpenEditItemModal = (index) => {
    const item = checkItems[index];

    AlertIOS.prompt(
      '编辑打卡项',
      '',
      async (text) => {
        await _saveCheckItem(item.id, text);
        const newCheckItem = Object.assign(item, { name: text })
        dispatchCheckItems({ type: 'edit', index: index, checkItem: newCheckItem })
      },
      'plain-text',
      item.name
    )
  };

  const handleAddItem = (newItem) => {
    dispatchCheckItems({ type: 'add', checkItem: newItem })
  }

  const _saveCheckItem = async (id, name) => {
    await fetchRequest(`/api/check_item/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        name
      })
    });
  }

  const _getCheckItems = async () => {
    const res = await fetchRequest('/api/check_item');
    const result = await res.json();
    dispatchCheckItems({ type: 'add', checkItem: result });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={checkItems}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => handleOpenEditItemModal(index)}>
            <Text style={[styles.item]}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  )
}

Setting.navigationOptions = ({ navigation }) => {
  const handleAddItem = navigation.getParam('handleAddItem');

  const prompToAddItem = () => {
    AlertIOS.prompt(
      '添加打卡项',
      '',
      async (text) => {
        const res = await fetchRequest('/api/check_item', {
          method: 'POST',
          body: JSON.stringify({
            name: text
          })
        })
        const result = await res.json();
        handleAddItem(result);
      },
      'plain-text',
      ''
    )
  }

  return {
    title: "设置",
    headerRight: (
      <Button
        title="+"
        onPress={prompToAddItem}
      />
    )
  }
}



const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(250,250,250,1)',
    marginTop: 30
  },
  item: {
    paddingLeft: 20,
    fontSize: 18,
    height: 50,
    lineHeight: 50,
    fontSize: 15,
  },
  nonBorder: {
    borderBottomWidth: 0
  }
})

export default Setting;
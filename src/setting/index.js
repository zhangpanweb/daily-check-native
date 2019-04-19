import React, { useEffect, useReducer } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, Alert, AlertIOS, ActionSheetIOS } from 'react-native';
import fetchRequest from '../../utils/fetch-request';

const Setting = ({ navigation }) => {
  const reducer = (state, action) => {
    let newState = [];
    switch (action.type) {
      case 'edit':
        newState = state.concat([]);
        newState[action.index] = action.checkItem;
        return newState;
      case 'add':
        return state.concat(action.checkItem);
      case 'delete':
        newState = state.concat([]);
        newState.splice(action.index, 1)
        return newState;
      default:
        return state;
    }
  }

  const [checkItems, dispatchCheckItems] = useReducer(reducer, []);

  useEffect(() => {
    _getCheckItems();
    navigation.setParams({ handleAddItem })
  }, []);

  const handleAddItem = (newItem) => {
    dispatchCheckItems({ type: 'add', checkItem: newItem })
  }

  const showActionSheet = (index) => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['取消', '编辑', '删除'],
        cancelButtonIndex: 0,
        destructiveButtonIndex: 2,
      },
      (buttionIndex) => {
        if (buttionIndex === 1) {
          _handleOpenEditItemModal(index)
        }
        if (buttionIndex === 2) {
          _handleOpenDeleteItemModal(index)
        }
      }
    )
  }

  const _handleOpenEditItemModal = (index) => {
    const item = checkItems[index];
    AlertIOS.prompt(
      '编辑打卡项',
      '',
      async (text) => {
        await _saveCheckItem(index, text);
      },
      'plain-text',
      item.name
    )
  };

  const _handleOpenDeleteItemModal = (index) => {
    AlertIOS.alert(
      '删除打卡项',
      '确认删除打卡项？',
      [{
        text: '取消',
        onPress: () => { },
        style: 'cancel'
      }, {
        text: '确认',
        onPress: async (text) => {
          await _deleteCheckItem(index);
        },
      }]

    )
  };

  const _saveCheckItem = async (index, text) => {
    const item = checkItems[index];
    await fetchRequest(`/api/check_item/${item.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        name: text
      })
    });
    const newCheckItem = Object.assign(item, { name: text })
    dispatchCheckItems({ type: 'edit', index: index, checkItem: newCheckItem })
  }

  const _deleteCheckItem = async (index) => {
    const id = checkItems[index].id;
    await fetchRequest(`/api/check_item/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        enabled: 0
      })
    })
    dispatchCheckItems({ type: 'delete', index: index })
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
          <TouchableOpacity onLongPress={() => { showActionSheet(index) }}>
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
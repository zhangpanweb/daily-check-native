import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, AlertIOS, TextInput } from 'react-native';
import fetchRequest from '../../utils/fetch-request';

const Setting = ({ navigation }) => {
  const [checkItems, setCheckItems] = useState([]);

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

        const newCheckItems = checkItems.concat([]);
        newCheckItems[index].name = text;
        setCheckItems(newCheckItems);
      },
      'plain-text',
      item.name
    )
  };

  const handleAddItem = (newItem) => {
    const newCheckItems = checkItems.concat([newItem]); // fixme checkItems is []
    setCheckItems(newCheckItems);
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
    setCheckItems(result);
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

  return {
    title: "设置",
    headerRight: (
      <Button
        title="+"
        onPress={() => {
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
        }}
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
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const RecordPreview = ({ recordData }) => {
  if (!recordData) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>完成项</Text>
      <FlatList
        data={recordData}
        renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
        keyExtractor={(item) => item.checkItemId.toString()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    width: 315,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: 'rgba(250,250,250,1)'
  },
  title: {
    textAlign: 'center',
    height: 45,
    lineHeight: 45,
  },
  item: {
    fontSize: 18,
    height: 45,
    lineHeight: 45,
    fontSize: 15,
    paddingLeft: 10
  },
})

export default RecordPreview;
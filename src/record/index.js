import React from 'react';
import { View, Text, Button } from 'react-native';

const Record = ({ navigation }) => {
  return (
    <View>
      <Text>Record Page</Text>
    </View>
  )
}
Record.navigationOptions = ({ navigation }) => ({
  title: "成就",
  headerRight: (
    <Button
      title="设置"
      onPress={() => navigation.navigate('setting')}
    />
  )
})


export default Record;
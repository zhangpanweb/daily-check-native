import React from 'react';
import { View, Text, Button } from 'react-native';

import Calendar from './calendar';

const Record = ({ navigation }) => {
  return (
    <View>
      <Calendar />
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
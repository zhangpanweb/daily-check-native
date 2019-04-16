import React from 'react';
import { View, Text, Button } from 'react-native';

const Setting = () => {
  return (
    <View>
      <Text>Setting Page</Text>
    </View>
  )
}

Setting.navigationOptions = ({ navigation }) => ({
  title: "设置",
  headerRight: (
    <Button
      title="+"
      onPress={() => {}}
    />
  )
})

export default Setting;
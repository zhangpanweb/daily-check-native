import React, { useState, useEffect } from 'react';
import { ScrollView, Text, Button } from 'react-native';
import fetchRequest from '../../utils/fetch-request';
import moment from 'moment';

import Calendar from './calendar';
import RecordPreview from './record-preview';

const Record = ({ }) => {
  const defaultDate = new Date();

  const [date, setDate] = useState(moment(defaultDate).format('YYYY-MM-DD')); // 选择的日期，格式为 YYYY-MM-DD
  const [records, setRecords] = useState({});

  useEffect(() => {
    _getRecords();
  }, []);

  const handleChangeDate = (date) => {
    setDate(date);
  };

  const _getRecords = async () => {
    const res = await fetchRequest('/api/check_record/month');
    const result = await res.json();
    setRecords(result);
  };

  return (
    <ScrollView>
      <Calendar onChangeDate={handleChangeDate}  value={date}/>
      <RecordPreview recordData={records[moment(date).format('YYYY-MM-DD')]} />
    </ScrollView>
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
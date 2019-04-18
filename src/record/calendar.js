import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';

const refrenceDate = {
  date: '1970-01-05',
  day: 1
};

function covertDateToDay(date) {
  const refrence = moment(refrenceDate.date);
  const targetDate = moment(date);
  const diff = targetDate.diff(refrence, 'days');

  let index = diff % 7;
  if (index < 0) index = -index;

  return refrenceDate.day + index;
}

const Calendar = ({ value = new Date(), onChangeDate }) => {
  const [selectedDate, setSelectedDate] = useState(parseInt(moment(value).format('DD'), 10)); // 被选中的这个月的第几天，类型为数字
  const [selectedMonth, setSelectedMonth] = useState(moment(value).format('YYYY-MM')); // 被选中的月份，格式为 YYYY-MM-DD
  const [monthDates, setMonthDates] = useState([]); // 日历上需要展示的这个月的天数组成的数组

  useEffect(() => {
    _formatDates();
  }, [selectedMonth]);

  /** 处理各类交互 */
  const handleSelectPreMonth = () => {
    const lastMonth = moment(selectedMonth).add(-1, 'months').format('YYYY-MM');
    setSelectedMonth(lastMonth);
  };

  const handleSelectNextMonth = () => {
    const nextMonth = moment(selectedMonth).add(1, 'months').format('YYYY-MM');
    setSelectedMonth(nextMonth);
  };

  const handleSelectedDate = (date) => {
    if (date) {
      setSelectedDate(date);

      const fomatedDate = `${moment(selectedMonth).format('YYYY-MM').toString()}-${date}`;
      onChangeDate(moment(fomatedDate).format('YYYY-MM-DD').toString());
    }
  };

  const _formatDates = () => {
    const dates = [];
    const firstDateOfMonth = moment(selectedMonth).startOf('month').format('YYYY-MM-DD');
    const firstDay = covertDateToDay(firstDateOfMonth);

    const lastDateNumberOfMonth = moment(selectedMonth).endOf('month').format('DD');
    const lastDateOfMonth = moment(selectedMonth).endOf('month').format('YYYY-MM-DD');
    const lastDay = covertDateToDay(lastDateOfMonth);

    /** [1,2,3,4,...,30] */
    for (let i = 1; i <= lastDateNumberOfMonth; i++) {
      dates.push(i);
    }

    /** 补充前一个月和后一个月的空白部分 */
    for (let i = firstDay; i > 1; i--) {
      dates.unshift(undefined);
    }
    for (let i = lastDay; i < 7; i++) {
      dates.push(undefined);
    }

    setMonthDates(dates);
  };

  let keyId = 0;
  return (
    <View style={styles.container}>
      <View style={[styles.title, styles.rowHeight]}>
        <TouchableOpacity onPress={handleSelectPreMonth}>
          <Image source={require('../../assets/images/calendar-left.png')} style={[styles.arrowImg, styles.leftArrow]} />
        </TouchableOpacity>
        <Text>{selectedMonth}</Text>
        <TouchableOpacity onPress={handleSelectNextMonth}>
          <Image source={require('../../assets/images/calendar-right.png')} style={[styles.arrowImg, styles.rightArrow]} />
        </TouchableOpacity>
      </View>

      <View style={styles.dateWrapper}>
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(date => {
          return <Text key={keyId++} style={[styles.date, styles.rowHeight, styles.day]}>{date}</Text>
        })}
      </View>

      <View style={styles.dateWrapper}>
        {monthDates.map((date, index) => {
          return (
            <TouchableOpacity onPress={() => handleSelectedDate(date)} key={keyId++}>
              <Text style={[styles.date, styles.rowHeight, selectedDate === date ? styles.selected : null]}>{date}</Text>
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 315,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
    backgroundColor: 'rgba(250,250,250,1)',
    height: 315
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  arrowImg: {
    width: 12,
    height: 12,
  },
  leftArrow: {
    marginLeft: 10
  },
  rightArrow: {
    marginRight: 10
  },
  dateWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  date: {
    width: 45,
    textAlign: 'center',
  },
  day: {
    color: 'rgba(0,0,0,.38)'
  },
  rowHeight: {
    height: 45,
    lineHeight: 45
  },
  selected: {
    backgroundColor: 'rgba(38,153,251,1)',
    borderRadius: 22.5,
    color: 'rgb(255, 255, 255)',
    overflow: 'hidden'
  }
})

export default Calendar;
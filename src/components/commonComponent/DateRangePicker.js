import React, { useEffect, useState } from 'react';
import { View, Button, Platform, Text, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SF, SH, SW } from '../../utils/dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import { formatDate } from '../../utils/formatTime';

const DateRangePicker = ({ fromDate, setFromDate, toDate, setToDate }) => {
  const [showFrom, setShowFrom] = useState(false);
  const [showTo, setShowTo] = useState(false);

  const handleStartRangeSelection = () => {
    setShowFrom(true);
  };
  useEffect(() => {
    console.log(fromDate);
  }, [fromDate]);

  const handleFromChange = (event, selectedDate) => {
    setShowFrom(false);
    if (event.type === 'set') {
      setFromDate(selectedDate);
      setTimeout(() => {
        setShowTo(true); // Automatically open to-date picker
      }, 300); // short delay to avoid animation conflicts
    }
  };

  const handleToChange = (event, selectedDate) => {
    setShowTo(false);
    if (event.type === 'set') {
      setToDate(selectedDate);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TouchableOpacity
        onPress={handleStartRangeSelection}
        style={{
          paddingVertical: SH(14),
          borderColor: 'rgba(150, 154, 164, 1)',
          borderWidth: SF(1),
          borderRadius: SF(10),
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: SW(20),
        }}
      >
        <Text
          style={{
            color: 'rgba(150, 154, 164, 1)',
            fontWeight: 400,
            fontSize: SF(16),
          }}
        >
          {fromDate !== null ? formatDate(fromDate) : 'dd-mm-yyyy'} to{' '}
          {toDate !== null ? formatDate(toDate) : 'dd-mm-yyyy'}
        </Text>
        <Icon
          name="calendar-outline"
          size={SF(25)}
          color={'rgba(50, 173, 230, 1)'}
        />
      </TouchableOpacity>
      {showFrom && (
        <DateTimePicker
          value={fromDate || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={handleFromChange}
        />
      )}

      {showTo && (
        <DateTimePicker
          value={toDate || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={handleToChange}
        />
      )}
    </View>
  );
};

export default DateRangePicker;

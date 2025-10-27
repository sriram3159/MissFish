// import React, { useEffect, useState } from 'react';
// import { View, Button, Platform, Text, TouchableOpacity } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { SF, SH, SW } from '../../utils/dimensions';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { formatDate } from '../../utils/formatTime';

// const DateRangePicker = ({ fromDate, setFromDate, toDate, setToDate }) => {
//   const [showFrom, setShowFrom] = useState(false);
//   const [showTo, setShowTo] = useState(false);

//   const handleStartRangeSelection = () => {
//     setShowFrom(true);
//   };
//   useEffect(() => {
//     console.log(fromDate);
//   }, [fromDate]);

//   const handleFromChange = (event, selectedDate) => {
//     setShowFrom(false);
//     if (event.type === 'set') {
//       setFromDate(selectedDate);
//       setTimeout(() => {
//         setShowTo(true); // Automatically open to-date picker
//       }, 300); // short delay to avoid animation conflicts
//     }
//   };

//   const handleToChange = (event, selectedDate) => {
//     setShowTo(false);
//     if (event.type === 'set') {
//       setToDate(selectedDate);
//     }
//   };

//   return (
//     <View style={{ padding: 20 }}>
//       <TouchableOpacity
//         onPress={handleStartRangeSelection}
//         style={{
//           paddingVertical: SH(14),
//           borderColor: 'rgba(150, 154, 164, 1)',
//           borderWidth: SF(1),
//           borderRadius: SF(10),
//           display: 'flex',
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           paddingHorizontal: SW(20),
//         }}
//       >
//         <Text
//           style={{
//             color: 'rgba(150, 154, 164, 1)',
//             fontWeight: 400,
//             fontSize: SF(16),
//           }}
//         >
//           {fromDate !== null ? formatDate(fromDate) : 'dd-mm-yyyy'} to{' '}
//           {toDate !== null ? formatDate(toDate) : 'dd-mm-yyyy'}
//         </Text>
//         <Icon
//           name="calendar-outline"
//           size={SF(25)}
//           color={'rgba(50, 173, 230, 1)'}
//         />
//       </TouchableOpacity>
//       {showFrom && (
//         <DateTimePicker
//           value={fromDate || new Date()}
//           mode="date"
//           display={Platform.OS === 'ios' ? 'inline' : 'default'}
//           onChange={handleFromChange}
//           minimumDate={new Date(1900, 0, 1)}
//           maximumDate={new Date(2100, 11, 31)}
//         />
//       )}

//       {showTo && (
//         <DateTimePicker
//           value={toDate || new Date()}
//           mode="date"
//           display={Platform.OS === 'ios' ? 'inline' : 'default'}
//           onChange={handleToChange}
//           minimumDate={new Date(1900, 0, 1)}
//           maximumDate={new Date(2100, 11, 31)}
//         />
//       )}
//     </View>
//   );
// };

// export default DateRangePicker;

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { SF, SH, SW } from '../../utils/dimensions';
import { formatDate } from '../../utils/formatTime';

const DateRangePicker = ({ fromDate, setFromDate, toDate, setToDate }) => {
  const [isFromPickerVisible, setFromPickerVisible] = useState(false);
  const [isToPickerVisible, setToPickerVisible] = useState(false);

  const showFromPicker = () => setFromPickerVisible(true);
  const hideFromPicker = () => setFromPickerVisible(false);

  const showToPicker = () => setToPickerVisible(true);
  const hideToPicker = () => setToPickerVisible(false);

  const handleFromConfirm = date => {
    setFromDate(date);
    hideFromPicker();
    setTimeout(() => showToPicker(), 300); // automatically show to-date picker
  };

  const handleToConfirm = date => {
    setToDate(date);
    hideToPicker();
  };

  return (
    <View style={{ padding: 20 }}>
      <TouchableOpacity
        onPress={showFromPicker}
        style={{
          paddingVertical: SH(14),
          borderColor: 'rgba(150, 154, 164, 1)',
          borderWidth: SF(1),
          borderRadius: SF(10),
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: SW(20),
        }}
      >
        <Text
          style={{
            color: 'rgba(150, 154, 164, 1)',
            fontWeight: '400',
            fontSize: SF(16),
          }}
        >
          {fromDate ? formatDate(fromDate) : 'dd-mm-yyyy'} to{' '}
          {toDate ? formatDate(toDate) : 'dd-mm-yyyy'}
        </Text>
        <Icon
          name="calendar-outline"
          size={SF(25)}
          color={'rgba(50, 173, 230, 1)'}
        />
      </TouchableOpacity>

      {/* From Date Picker */}
      <DateTimePickerModal
        isVisible={isFromPickerVisible}
        mode="date"
        date={fromDate || new Date()}
        onConfirm={handleFromConfirm}
        onCancel={hideFromPicker}
        minimumDate={new Date(1900, 0, 1)}
        maximumDate={new Date(2100, 11, 31)}
        display={Platform.OS === 'ios' ? 'inline' : 'spinner'}
      />

      {/* To Date Picker */}
      <DateTimePickerModal
        isVisible={isToPickerVisible}
        mode="date"
        date={toDate || new Date()}
        onConfirm={handleToConfirm}
        onCancel={hideToPicker}
        minimumDate={new Date(1900, 0, 1)}
        maximumDate={new Date(2100, 11, 31)}
        display={Platform.OS === 'ios' ? 'inline' : 'spinner'}
      />
    </View>
  );
};

export default DateRangePicker;

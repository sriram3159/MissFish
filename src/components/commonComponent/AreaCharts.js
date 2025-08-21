import { ScrollView, Text } from 'react-native';
import { View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { SF, SH, SW } from '../../utils/dimensions';

const customLabel = val => {
  return (
    <View style={{ width: 84, alignItems: 'center' }}>
      {/* Match with spacing */}
      <Text
        style={{
          color: 'rgba(156, 155, 166, 1)',
          fontWeight: '400',
          fontSize: SF(9),
        }}
      >
        {val}
      </Text>
    </View>
  );
};
const AreaCharts = () => {
  const data1 = [
    { value: 70, labelComponent: () => customLabel('10AM') },
    { value: 36, labelComponent: () => customLabel('11AM') },
    { value: 50, labelComponent: () => customLabel('12AM') },
    { value: 40, labelComponent: () => customLabel('01AM') },
    { value: 18, labelComponent: () => customLabel('02AM') },
    { value: 38, labelComponent: () => customLabel('03AM') },
    { value: 90, labelComponent: () => customLabel('04AM') },
  ];
  const chartWidth = data1.length * 84;
  const maxDataValue = Math.max(...data1.map(item => item.value));
  const chartMaxValue = Math.ceil(maxDataValue * 1.3);
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View
        style={{
          width: chartWidth,
          //   backgroundColor: 'red',
        }}
      >
        <LineChart
          areaChart
          curved
          data={data1}
          hideDataPoints
          spacing={68}
          color1="rgba(50, 173, 230, 1)"
          startFillColor1="rgba(50, 173, 230, 1)"
          endFillColor1="rgba(50, 173, 230, 1)"
          startOpacity={0.9}
          endOpacity={0.2}
          initialSpacing={0}
          noOfSections={1}
          yAxisThickness={0}
          maxValue={chartMaxValue}
          height={SH(160)}
          rulesType="none"
          rulesColor="transparent"
          yAxisTextStyle={{ color: 'transparent' }}
          xAxisColor="rgba(50, 173, 230, 1)"
          isScrollEnabled={true} // ✅ enables chart scrolling
          scrollToEnd={false} // optional
          pointerConfig={{
            pointerStripUptoDataPoint: true,
            pointerStripColor: 'lightgray',
            strokeDashArray: [2, 5],
            pointerColor: 'lightgray',
            radius: 4,
            pointerLabelWidth: 67,

            pointerLabelComponent: items => {
              return (
                <View
                  style={{
                    backgroundColor: '#282C3E',
                    borderRadius: SF(6),
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: SH(6),
                    transform: [
                      { translateY: -SH(10) },
                      { translateX: SW(10) },
                    ],
                  }}
                >
                  <Text
                    style={{
                      color: 'rgba(255, 255, 255, 1)',
                      fontWeight: '700',
                      fontSize: SF(14),
                    }}
                  >
                    ₹{items[0].value}
                  </Text>
                </View>
              );
            },
          }}
        />
      </View>
    </ScrollView>
  );
};

export default AreaCharts;

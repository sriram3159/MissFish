import { Text, View } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import { SF } from '../../utils/dimensions';

const PieCharts = () => {
  const pieData = [
    {
      value: 64,
      color: 'rgba(255, 156, 69, 1)',
      gradientCenterColor: 'rgba(255, 156, 69, 1)',
      //   focused: true,
    },
    {
      value: 26,
      color: 'rgba(5, 200, 15, 1)',
      gradientCenterColor: 'rgba(5, 200, 15, 1)',
    },
    {
      value: 10,
      color: 'rgba(186, 11, 11, 1)',
      gradientCenterColor: 'rgba(186, 11, 11, 1)',
    },
  ];

  const renderDot = color => {
    return (
      <View
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: color,
          marginRight: 10,
        }}
      />
    );
  };

  const renderLegendComponent = () => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 10,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: 120,
              marginRight: 20,
            }}
          >
            {renderDot('#006DFF')}
            <Text style={{ color: 'white' }}>Excellent: 47%</Text>
          </View>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', width: 120 }}
          >
            {renderDot('#8F80F3')}
            <Text style={{ color: 'white' }}>Okay: 16%</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: 120,
              marginRight: 20,
            }}
          >
            {renderDot('#3BE9DE')}
            <Text style={{ color: 'white' }}>Good: 40%</Text>
          </View>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', width: 120 }}
          >
            {renderDot('#FF7F97')}
            <Text style={{ color: 'white' }}>Poor: 3%</Text>
          </View>
        </View>
      </>
    );
  };

  return (
    <View style={{ padding: 20, alignItems: 'center' }}>
      <PieChart
        data={pieData}
        donut
        showGradient
        sectionAutoFocus
        radius={SF(100)}
        innerRadius={SF(65)}
        // innerCircleColor={'#232B5D'}
        centerLabelComponent={() => {
          return (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text
                style={{
                  fontSize: SF(22),
                  color: 'rgba(28, 42, 83, 1)',
                  fontWeight: 600,
                }}
              >
                64%
              </Text>
            </View>
          );
        }}
      />
      {renderLegendComponent()}
    </View>
  );
};

export default PieCharts;

import { Text, View } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import { SF, SH, SW } from '../../utils/dimensions';

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
          height: SF(8),
          width: SF(8),
          borderRadius: SF(4),
          backgroundColor: color,
          marginRight: SW(7),
        }}
      />
    );
  };

  const renderLegendComponent = () => {
    return (
      <>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            gap: SH(30),
            flex: 1,
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              {renderDot('rgba(255, 156, 69, 1)')}
              <Text
                style={{
                  color: 'rgba(142, 149, 169, 1)',
                  fontWeight: 700,
                  fontSize: SF(12),
                }}
              >
                Delivered
              </Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', gap: SW(9) }}>
              <Text
                style={{
                  color: 'rgba(28, 42, 83, 1)',
                  fontWeight: 700,
                  fontSize: SF(14),
                }}
              >
                24
              </Text>
              <Text
                style={{
                  color: 'rgba(255, 156, 69, 1)',
                  fontWeight: 700,
                  fontSize: SF(14),
                }}
              >
                (64%)
              </Text>
            </View>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              {renderDot('rgba(5, 200, 15, 1)')}
              <Text
                style={{
                  color: 'rgba(142, 149, 169, 1)',
                  fontWeight: 700,
                  fontSize: SF(12),
                }}
              >
                Processing
              </Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', gap: SW(9) }}>
              <Text
                style={{
                  color: 'rgba(28, 42, 83, 1)',
                  fontWeight: 700,
                  fontSize: SF(14),
                }}
              >
                24
              </Text>
              <Text
                style={{
                  color: 'rgba(5, 200, 15, 1)',
                  fontWeight: 700,
                  fontSize: SF(14),
                }}
              >
                (26%)
              </Text>
            </View>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              {renderDot('rgba(186, 11, 11, 1)')}
              <Text
                style={{
                  color: 'rgba(142, 149, 169, 1)',
                  fontWeight: 700,
                  fontSize: SF(12),
                }}
              >
                Canceled
              </Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', gap: SW(9) }}>
              <Text
                style={{
                  color: 'rgba(28, 42, 83, 1)',
                  fontWeight: 700,
                  fontSize: SF(14),
                }}
              >
                24
              </Text>
              <Text
                style={{
                  color: 'rgba(186, 11, 11, 1)',
                  fontWeight: 700,
                  fontSize: SF(14),
                }}
              >
                (10%)
              </Text>
            </View>
          </View>
        </View>
      </>
    );
  };

  return (
    <View
      style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <PieChart
        data={pieData}
        donut
        showGradient
        sectionAutoFocus
        radius={SF(60)}
        innerRadius={SF(40)}
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

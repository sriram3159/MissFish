import { Text, View } from 'react-native';
import { SF, SH, SW } from '../utils/dimensions';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native';

const BottomNavbar = ({ handleNavigate, navType }) => {
  return (
    <View
      style={{
        backgroundColor: 'rgba(255, 255, 255, 1)',
        paddingVertical: SH(16),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SW(32),
        borderRadius: SF(30),
      }}
    >
      <TouchableOpacity onPress={() => handleNavigate('menu')}>
        <MaterialIcon
          name="grid-view"
          color={
            navType.menu ? 'rgba(58, 216, 251, 1)' : 'rgba(175, 175, 175, 1)'
          }
          size={SF(25)}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigate('order')}>
        <MaterialIcon
          name="menu"
          color={
            navType.order ? 'rgba(58, 216, 251, 1)' : 'rgba(175, 175, 175, 1)'
          }
          size={SF(25)}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          padding: SF(16),
          backgroundColor: 'rgba(58, 216, 251, 0.2)',
          borderRadius: SF(32),
          borderWidth: SF(1),
          borderColor: 'rgba(58, 216, 251, 1)',
        }}
      >
        <MaterialIcon name="add" color="rgba(58, 216, 251, 1)" size={SF(25)} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigate('notification')}>
        <Feather
          name="bell"
          color={
            navType.notification
              ? 'rgba(58, 216, 251, 1)'
              : 'rgba(175, 175, 175, 1)'
          }
          size={SF(20)}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigate('profile')}>
        <Feather
          name="user"
          color={
            navType.profile ? 'rgba(58, 216, 251, 1)' : 'rgba(175, 175, 175, 1)'
          }
          size={SF(20)}
        />
      </TouchableOpacity>
    </View>
  );
};

export default BottomNavbar;

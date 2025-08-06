import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Menu, Button } from 'react-native-paper';
import { SF, SW, SH } from '../../utils/dimensions'; // assuming you have these

const DropdownMenu = ({ options = [], onSelect, label = 'Daily' }) => {
  const [visible, setVisible] = useState(false);

  const toggleMenu = () => setVisible(prev => !prev);
  const closeMenu = () => setVisible(false);

  const handleSelect = value => {
    onSelect(value);
    closeMenu();
  };

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Button
            onPress={toggleMenu}
            contentStyle={styles.buttonContent}
            style={styles.button}
            labelStyle={styles.label}
            icon="chevron-down" // uses MaterialCommunityIcons
          >
            {label}
          </Button>
        }
        contentStyle={{ marginTop: SH(50) }}
      >
        {options.map((option, index) => (
          <Menu.Item
            key={index}
            onPress={() => handleSelect(option.value)}
            title={option.label}
          />
        ))}
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    margin: SW(10),
  },
  button: {
    borderColor: 'rgba(232, 234, 237, 1)',
    borderWidth: 1,
    borderRadius: SF(4),
  },
  buttonContent: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    justifyContent: 'center',
  },
  label: {
    color: 'rgba(156, 155, 166, 1)',
    fontSize: SF(12),
    fontWeight: '700',
    textTransform: 'none',
  },
});

export default DropdownMenu;

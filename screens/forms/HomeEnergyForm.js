import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeEnergyForm = () => {
  return (
    <View style={styles.container}>
      <Text>Home Energy Form</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeEnergyForm;

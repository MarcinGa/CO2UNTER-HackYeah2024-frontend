import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PrzeliczScreen = () => {
  return (
    <View style={styles.center}>
      <Text>Przelicz</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PrzeliczScreen;

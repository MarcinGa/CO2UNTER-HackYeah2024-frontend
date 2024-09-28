import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ConvertScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Convert Screen</Text>
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

export default ConvertScreen;

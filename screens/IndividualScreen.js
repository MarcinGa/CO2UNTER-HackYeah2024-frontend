import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const IndywidualnieScreen = () => {
  return (
    <View style={styles.center}>
      <Text>Indywidualnie</Text>
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

export default IndywidualnieScreen;

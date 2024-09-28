import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';

const ParksScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Wybierz typ parku:</Text>
      <Button title="Parki Miejskie" onPress={() => navigation.navigate('ParksCity')} />
      <Button title="Parki Kieszonkowe" onPress={() => navigation.navigate('ParksPocket')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default ParksScreen;

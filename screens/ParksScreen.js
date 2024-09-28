// screens/ParksScreen.js
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const ParksScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button title="Town Parks" onPress={() => navigation.navigate('TownParks')} />
      <Button title="Pocket Parks" onPress={() => navigation.navigate('PocketParks')} />
      <Button title="Find Pocket Park" onPress={() => navigation.navigate('PocketParkSearch')} />
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

export default ParksScreen;

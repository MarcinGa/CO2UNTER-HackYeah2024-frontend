import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const ParksScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        title="Parki miejskie"
        onPress={() => navigation.navigate('TownParks')}
      />
      <Button
        title="Parki kieszonkowe"
        onPress={() => navigation.navigate('PocketParks')}
      />
      <Button
        title="Znajdź park"
        onPress={() => navigation.navigate('PocketParkSearch')}
      />
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

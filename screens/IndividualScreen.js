import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const IndividualScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button title="Transport" onPress={() => navigation.navigate('TransportForm')} />
      <Button title="Energia domowa" onPress={() => navigation.navigate('HomeEnergyForm')} />
      <Button title="Produkty konsumpcyjne" onPress={() => navigation.navigate('ConsumptionProductsForm')} />
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

export default IndividualScreen;

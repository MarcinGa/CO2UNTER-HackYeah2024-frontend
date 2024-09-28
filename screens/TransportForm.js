import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Picker } from 'react-native';

const TransportForm = () => {
  const [vehicleType, setVehicleType] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [distance, setDistance] = useState('');
  const [averageConsumption, setAverageConsumption] = useState('');
  const [passengers, setPassengers] = useState('');

  const handleSubmit = () => {
    // Tutaj można dodać logikę obsługi formularza
    console.log({
      vehicleType,
      fuelType,
      distance,
      averageConsumption,
      passengers,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transport Form</Text>
      
      <TextInput
        placeholder="Rodzaj pojazdu"
        value={vehicleType}
        onChangeText={setVehicleType}
        style={styles.input}
      />
      
      <Picker
        selectedValue={fuelType}
        onValueChange={(itemValue) => setFuelType(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Wybierz typ paliwa" value="" />
        <Picker.Item label="Benzyna" value="gasoline" />
        <Picker.Item label="Diesel" value="diesel" />
        <Picker.Item label="Elektryczny" value="electric" />
      </Picker>

      <TextInput
        placeholder="Przebyty dystans (km)"
        value={distance}
        onChangeText={setDistance}
        keyboardType="numeric"
        style={styles.input}
      />
      
      <TextInput
        placeholder="Średnie spalanie (l/100km)"
        value={averageConsumption}
        onChangeText={setAverageConsumption}
        keyboardType="numeric"
        style={styles.input}
      />
      
      <TextInput
        placeholder="Liczba pasażerów"
        value={passengers}
        onChangeText={setPassengers}
        keyboardType="numeric"
        style={styles.input}
      />
      
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
  },
});

export default TransportForm;

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Picker, Alert, FlatList } from 'react-native';

const TransportForm = () => {
  const [vehicleType, setVehicleType] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [distance, setDistance] = useState('');
  const [averageConsumption, setAverageConsumption] = useState('');
  const [passengers, setPassengers] = useState('');
  const [users, setUsers] = useState([]); // Stan dla pobranych danych

  // Funkcja do pobrania użytkowników
  const fetchUsers = async () => {
    try {
      const response = await fetch('https://co2unter-hackyeah2024-backend.onrender.com/data/users');
      if (!response.ok) {
        throw new Error('Błąd pobierania danych');
      }
      const data = await response.json();
      setUsers(data); // Zapisanie pobranych danych w stanie
    } catch (error) {
      Alert.alert('Błąd', error.message, [{ text: 'OK' }]);
    }
  };

  // Wywołujemy fetchUsers przy montowaniu komponentu
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async () => {
    const formData = {
      vehicleType,
      fuelType,
      distance,
      averageConsumption,
      passengers,
    };

    try {
      const response = await fetch('https://co2unter-hackyeah2024-backend.onrender.com/data/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit the form');
      }

      const result = await response.json();
      Alert.alert('Sukces!', 'Dane zostały przesłane.', [{ text: 'OK' }]);

      setVehicleType('');
      setFuelType('');
      setDistance('');
      setAverageConsumption('');
      setPassengers('');
    } catch (error) {
      Alert.alert('Błąd', error.message, [{ text: 'OK' }]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transport Form</Text>
      
      {/* Formularz transportu */}
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

      {/* Wyświetlenie listy użytkowników */}
      <Text style={styles.title}>Lista użytkowników:</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <Text>Rodzaj pojazdu: {item.vehicleType}</Text>
            <Text>Typ paliwa: {item.fuelType}</Text>
            <Text>Przebyty dystans: {item.distance} km</Text>
            <Text>Średnie spalanie: {item.averageConsumption} l/100km</Text>
            <Text>Liczba pasażerów: {item.passengers}</Text>
          </View>
        )}
      />
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
  userItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default TransportForm;

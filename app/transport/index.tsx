import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, FlatList, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { Picker } from '@react-native-picker/picker';

const TransportForm = () => {
  const [vehicleType, setVehicleType] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [distance, setDistance] = useState('');
  const [averageConsumption, setAverageConsumption] = useState('');
  const [passengers, setPassengers] = useState('');
  const [timePeriod, setTimePeriod] = useState('');
  const [userId, setUserId] = useState(null); // Przechowuje ID użytkownika
  const [users, setUsers] = useState([]); // Stan dla pobranych danych

  // Funkcja do pobrania użytkowników (jeśli potrzebujesz pobierać listę użytkowników)
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

    // Przy każdym uruchomieniu aplikacji, próbujemy załadować ID użytkownika z AsyncStorage
    loadUserIdFromStorage();
  }, []);

  // Funkcja do załadowania ID użytkownika z AsyncStorage
  const loadUserIdFromStorage = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem('userId');
      if (storedUserId) {
        setUserId(storedUserId); // Ustawienie ID użytkownika, jeśli istnieje w AsyncStorage
      }
    } catch (error) {
      console.error('Error loading user ID:', error);
    }
  };

  // Funkcja do zapisania ID użytkownika do AsyncStorage
  const saveUserIdToStorage = async (id) => {
    try {
      await AsyncStorage.setItem('userId', id);
      setUserId(id); // Zapisujemy ID również w stanie komponentu
    } catch (error) {
      console.error('Error saving user ID:', error);
    }
  };

  const handleSubmit = async () => {
    const formData = {
      vehicleType,
      fuelType,
      distance,
      averageConsumption,
      passengers,
      timePeriod,
    };

    try {
      // 1. Wysłanie danych formularza na endpoint /data/user
      const response = await fetch('https://co2unter-hackyeah2024-backend.onrender.com/data/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit the form');
      }

      const result = await response.json();
      const newUserId = result._id; // Otrzymane ID nowego użytkownika z odpowiedzi

      // Zapisujemy ID nowego użytkownika w AsyncStorage
      await saveUserIdToStorage(newUserId);

      Alert.alert('Sukces!', 'Dane formularza zostały przesłane.', [{ text: 'OK' }]);

      // Resetowanie wartości formularza
      setVehicleType('');
      setFuelType('');
      setDistance('');
      setAverageConsumption('');
      setPassengers('');
      setTimePeriod('');

    } catch (error) {
      Alert.alert('Błąd', error.message, [{ text: 'OK' }]);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
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

      <Picker
        selectedValue={timePeriod}
        onValueChange={(itemValue) => setTimePeriod(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Wybierz okres czasu" value="" />
        <Picker.Item label="1 dzień" value="1dzien" />
        <Picker.Item label="1 tydzień" value="1tydzien" />
        <Picker.Item label="1 miesiąc" value="1miesiac" />
      </Picker>

      <Button title="Submit" onPress={handleSubmit} />

      {/* Wyświetlenie ID użytkownika, jeśli istnieje */}
      {userId && (
        <Text style={styles.title}>Twoje ID: {userId}</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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

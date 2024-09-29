import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, FlatList, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

const TransportForm = () => {
  const [vehicleType, setVehicleType] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [distance, setDistance] = useState('');
  const [averageConsumption, setAverageConsumption] = useState('');
  const [passengers, setPassengers] = useState('');
  const [timePeriod, setTimePeriod] = useState('');
  const [userId, setUserId] = useState(null);
  const [users, setUsers] = useState([]);
  const [emissionResults, setEmissionResults] = useState({}); // Używamy obiektu do przechowywania wyników emisji

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://co2unter-hackyeah2024-backend.onrender.com/data/users');
      if (!response.ok) {
        throw new Error('Błąd pobierania danych');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      Alert.alert('Błąd', error.message, [{ text: 'OK' }]);
    }
  };

  useEffect(() => {
    fetchUsers();
    loadUserIdFromStorage();
  }, []);

  const loadUserIdFromStorage = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem('userId');
      if (storedUserId) {
        setUserId(storedUserId);
      }
    } catch (error) {
      console.error('Error loading user ID:', error);
    }
  };

  const saveUserIdToStorage = async (id) => {
    try {
      await AsyncStorage.setItem('userId', id);
      setUserId(id);
    } catch (error) {
      console.error('Error saving user ID:', error);
    }
  };

  const handleCalculateEmission = async (userId) => {
    try {
      const response = await fetch(
        `https://co2unter-hackyeah2024-backend.onrender.com/data/users/${userId}/actions/calculate`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to calculate emissions");
      }

      const result = await response.json();
      setEmissionResults((prevResults) => ({
        ...prevResults,
        [userId]: result, // Przechowujemy wynik dla danego userId
      }));
    } catch (error) {
      Alert.alert("Błąd", error.message, [{ text: "OK" }]);
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
      let response;

      if (userId) {
        response = await fetch(`https://co2unter-hackyeah2024-backend.onrender.com/data/user/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error('Failed to update the form');
        }

        Alert.alert('Sukces!', 'Dane użytkownika zostały zaktualizowane.', [{ text: 'OK' }]);
      } else {
        response = await fetch('https://co2unter-hackyeah2024-backend.onrender.com/data/user', {
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
        const newUserId = result._id;
        await saveUserIdToStorage(newUserId);
        Alert.alert('Sukces!', 'Dane formularza zostały przesłane.', [{ text: 'OK' }]);
      }

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

      {userId && (
        <Text style={styles.title}>Twoje ID: {userId}</Text>
      )}

      <Text style={styles.title}>Lista użytkowników:</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <Text>{item._id}</Text>
            <Text>Rodzaj pojazdu: {item.vehicleType}</Text>
            <Text>Typ paliwa: {item.fuelType}</Text>
            <Text>Przebyty dystans: {item.distance} km</Text>
            <Text>Średnie spalanie: {item.averageConsumption} l/100km</Text>
            <Text>Liczba pasażerów: {item.passengers}</Text>

            {/* Sprawdź, czy wynik emisji jest dostępny */}
            {emissionResults[item._id] ? ( // Upewnij się, że wyświetlasz wynik dla danego użytkownika
            <>
              {/* <Text>Wynik emisji: {JSON.stringify(emissionResults[item._id])}</Text> // Wyświetlenie wyniku emisji */}
              <Text>
                Wynik emisji: {emissionResults[item._id].yourEmission} kg CO2,
                Park: {emissionResults[item._id].park},
                Sadzonek: {emissionResults[item._id].sadzonka}
                Drzew liściastych: {emissionResults[item._id].drzewoL} drzew,
                Drzew iglastych: {emissionResults[item._id].drzewoI} drzew,
              </Text>
            </>
            ) : (
              <Button
                title="Oblicz ślad"
                onPress={() => handleCalculateEmission(item._id)} // Przekazanie ID użytkownika
              />
            )}
          </View>
        )}
      />
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

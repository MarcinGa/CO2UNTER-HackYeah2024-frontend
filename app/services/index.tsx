import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

const ServiceSectorForm = ({ onSubmit }) => {
  const [dietType, setDietType] = useState('');
  const [typeOfMeal, setTypeOfMeal] = useState('');
  const [shoppingFrequency, setShoppingFrequency] = useState('');
  const [userId, setUserId] = useState(null);
  const [emissionResult, setEmissionResult] = useState(null);

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

  useEffect(() => {
    loadUserIdFromStorage();
  }, []);

  // const checkUserExists = async (userId) => {
  //   try {
  //     const response = await fetch(`https://co2unter-hackyeah2024-backend.onrender.com/data/user/${userId}`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     return response.ok; // Zwracamy true, jeśli użytkownik istnieje
  //   } catch (error) {
  //     Alert.alert('Błąd', error.message, [{ text: 'OK' }]);
  //     return false;
  //   }
  // };

  const calculateEmission = async (userId) => {
    try {
      const response = await fetch(
        `https://co2unter-hackyeah2024-backend.onrender.com/data/users/${userId}/actions/calculate`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to calculate emissions');
      }

      const result = await response.json();
      setEmissionResult(result);
    } catch (error) {
      Alert.alert('Błąd', error.message, [{ text: 'OK' }]);
    }
  };

  const handleSubmit = async () => {
    const formData = {
      dietType,
      typeOfMeal,
      shoppingFrequency,
    };

    try {
      let response;
      let newUserId;

      if (userId) {
        // Użytkownik istnieje, aktualizujemy dane
        response = await fetch(`https://co2unter-hackyeah2024-backend.onrender.com/data/user/${userId}/actions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error('Failed to update the form');
        }

      } else {
        // Użytkownik nie istnieje, tworzymy nowego
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
        newUserId = result._id;
        await AsyncStorage.setItem('userId', newUserId);
        setUserId(newUserId);
        Alert.alert('Sukces!', 'Dane formularza zostały przesłane.', [{ text: 'OK' }]);
      }

      // Resetowanie formularza
      setDietType('');
      setTypeOfMeal('');
      setShoppingFrequency('');

      // Oblicz emisję dla użytkownika
      calculateEmission(userId || newUserId);

      // Wywołanie funkcji przekazanej przez rodzica
      if (onSubmit) {
        onSubmit(userId);
      }

    } catch (error) {
      Alert.alert('Błąd', error.message, [{ text: 'OK' }]);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>User Form</Text>

      <Picker
        selectedValue={dietType}
        onValueChange={(itemValue) => setDietType(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Wybierz typ diety" value="" />
        <Picker.Item label="Wegańska" value="vegan" />
        <Picker.Item label="Wegetariańska" value="vegetarian" />
        <Picker.Item label="Mięsna" value="meat" />
        <Picker.Item label="Inna" value="other" />
      </Picker>

      <Picker
        selectedValue={typeOfMeal}
        onValueChange={(itemValue) => setTypeOfMeal(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Wybierz typ posiłku" value="" />
        <Picker.Item label="Śniadanie" value="breakfast" />
        <Picker.Item label="Obiad" value="lunch" />
        <Picker.Item label="Kolacja" value="dinner" />
      </Picker>

      <Picker
        selectedValue={shoppingFrequency}
        onValueChange={(itemValue) => setShoppingFrequency(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Częstotliwość zakupów" value="" />
        <Picker.Item label="Codziennie" value="daily" />
        <Picker.Item label="Raz w tygodniu" value="weekly" />
        <Picker.Item label="Raz w miesiącu" value="monthly" />
      </Picker>

      <Button title="Submit" onPress={handleSubmit} />

      {userId && (
        <Text style={styles.title}>Twoje ID: {userId}</Text>
      )}

      {/* Wyświetlanie wyniku emisji, jeśli dostępny */}
      {emissionResult && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Wynik emisji:</Text>
          <Text>Twoja emisja: {emissionResult.yourEmission} kg CO2</Text>
          <Text>Park: {emissionResult.park}</Text>
          <Text>Sadzonek: {emissionResult.sadzonka}</Text>
          <Text>Drzew liściastych: {emissionResult.drzewoL} drzew</Text>
          <Text>Drzew iglastych: {emissionResult.drzewoI} drzew</Text>
        </View>
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
  resultContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
  },
  resultTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
});

export default ServiceSectorForm;
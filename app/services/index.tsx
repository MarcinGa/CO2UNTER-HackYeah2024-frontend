import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

const ServicesScreen = () => {
  const [userId, setUserId] = useState(null); // Przechowuje ID użytkownika
  const [eatingOutFrequency, setEatingOutFrequency] = useState("");
  const [useOfDisposableUtensils, setUseOfDisposableUtensils] = useState("");
  const [hotelUsageFrequency, setHotelUsageFrequency] = useState("");
  const [shoppingFrequency, setShoppingFrequency] = useState("");

  // Funkcja do załadowania ID użytkownika z AsyncStorage
  const loadUserIdFromStorage = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem("userId");
      if (storedUserId) {
        setUserId(storedUserId); // Ustawienie ID użytkownika, jeśli istnieje w AsyncStorage
        fetchServiceData(storedUserId); // Pobranie danych z serwisu dla użytkownika
      }
    } catch (error) {
      console.error("Error loading user ID:", error);
    }
  };

  useEffect(() => {
    loadUserIdFromStorage();
  }, []);

  // Funkcja GET do pobrania danych z serwera
  const fetchServiceData = async (userId) => {
    try {
      const response = await fetch(
        `https://co2unter-hackyeah2024-backend.onrender.com/users/${userId}/service-sector`
      );
      if (!response.ok) {
        throw new Error("Błąd podczas pobierania danych sektora usług");
      }
      const data = await response.json();
      // Ustaw dane sektora usług w stanie
      setEatingOutFrequency(data.eatingOutFrequency.toString());
      setUseOfDisposableUtensils(data.useOfDisposableUtensils);
      setHotelUsageFrequency(data.hotelUsageFrequency.toString());
      setShoppingFrequency(data.shoppingFrequency.toString());
    } catch (error) {
      Alert.alert("Błąd", error.message, [{ text: "OK" }]);
    }
  };

  // Funkcja POST/PUT do wysłania danych na serwer
  const handleSubmit = async () => {
    const formData = {
      eatingOutFrequency: Number(eatingOutFrequency),
      useOfDisposableUtensils,
      hotelUsageFrequency: Number(hotelUsageFrequency),
      shoppingFrequency: Number(shoppingFrequency),
    };

    try {
      let response;
      if (userId) {
        // Jeśli istnieje userId, sprawdź, czy dane sektora usług są już zapisane
        const getResponse = await fetch(
          `https://co2unter-hackyeah2024-backend.onrender.com/users/${userId}/service-sector`
        );
        if (getResponse.ok) {
          // Dane sektora usług już istnieją, wykonaj PUT (aktualizacja)
          response = await fetch(
            `https://co2unter-hackyeah2024-backend.onrender.com/users/${userId}/service-sector`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            }
          );
        } else {
          // Dane nie istnieją, wykonaj POST (tworzenie)
          response = await fetch(
            `https://co2unter-hackyeah2024-backend.onrender.com/users/${userId}/service-sector`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            }
          );
        }

        if (!response.ok) {
          throw new Error("Błąd podczas przesyłania danych sektora usług");
        }

        Alert.alert("Sukces!", "Dane sektora usług zostały zapisane.", [
          { text: "OK" },
        ]);
      }
    } catch (error) {
      Alert.alert("Błąd", error.message, [{ text: "OK" }]);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Service Sector Form</Text>

      {/* Wyświetlenie userId */}
      {userId && <Text style={styles.userIdText}>User ID: {userId}</Text>}

      <TextInput
        placeholder="Częstotliwość jedzenia na zewnątrz"
        value={eatingOutFrequency}
        onChangeText={setEatingOutFrequency}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        placeholder="Używanie jednorazowych naczyń"
        value={useOfDisposableUtensils}
        onChangeText={setUseOfDisposableUtensils}
        style={styles.input}
      />

      <TextInput
        placeholder="Częstotliwość korzystania z hoteli"
        value={hotelUsageFrequency}
        onChangeText={setHotelUsageFrequency}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        placeholder="Częstotliwość zakupów"
        value={shoppingFrequency}
        onChangeText={setShoppingFrequency}
        keyboardType="numeric"
        style={styles.input}
      />

      <Button title="Submit" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
  },
  userIdText: {
    fontSize: 16,
    marginBottom: 20,
    color: "blue", // Styl dla lepszego wyróżnienia
  },
});

export default ServicesScreen;

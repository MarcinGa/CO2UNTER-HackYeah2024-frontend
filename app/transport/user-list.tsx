import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert } from 'react-native';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [emissionResults, setEmissionResults] = useState({});

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

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <View style={styles.container}>
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

            {emissionResults[item._id] ? (
              <Text>
                Wynik emisji: {emissionResults[item._id].yourEmission} kg CO2,
                Park: {emissionResults[item._id].park},
                Sadzonek: {emissionResults[item._id].sadzonka}
                Drzew liściastych: {emissionResults[item._id].drzewoL} drzew,
                Drzew iglastych: {emissionResults[item._id].drzewoI} drzew,
              </Text>
            ) : (
              <Button
                title="Oblicz ślad"
                onPress={() => handleCalculateEmission(item._id)}
              />
            )}
          </View>
        )}
      />
    </View>
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
  userItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default UserList;

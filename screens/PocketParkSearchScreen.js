import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';

const PocketParkSearchScreen = () => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [district, setDistrict] = useState('');
  const [accessibility, setAccessibility] = useState('');
  const [type, setType] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const fetchParks = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Błąd podczas pobierania danych');
      }
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      Alert.alert('Błąd', error.message);
    }
  };

  const handleSearchByName = () => {
    const url = `http://localhost:3000/data/small-parks/by-name/${name}`;
    fetchParks(url);
  };

  const handleSearchByStatus = () => {
    const url = `http://localhost:3000/data/small-parks/by-status/${status}`;
    fetchParks(url);
  };

  const handleSearchByDistrict = () => {
    const url = `http://localhost:3000/data/small-parks/by-district/${district}`;
    fetchParks(url);
  };

  const handleSearchByAccessibility = () => {
    const url = `http://localhost:3000/data/small-parks/by-accessibility/${accessibility}`;
    fetchParks(url);
  };

  const handleSearchByType = () => {
    const url = `http://localhost:3000/data/small-parks/by-type/${type}`;
    fetchPparks(url);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Szukaj po nazwie"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <Button title="Szukaj po nazwie" onPress={handleSearchByName} />

      <TextInput
        placeholder="Szukaj po statusie"
        value={status}
        onChangeText={setStatus}
        style={styles.input}
      />
      <Button title="Szukaj po statusie" onPress={handleSearchByStatus} />

      <TextInput
        placeholder="Szukaj po dzielnicy"
        value={district}
        onChangeText={setDistrict}
        style={styles.input}
      />
      <Button title="Szukaj po dzielnicy" onPress={handleSearchByDistrict} />

      <TextInput
        placeholder="Szukaj po dostępności"
        value={accessibility}
        onChangeText={setAccessibility}
        style={styles.input}
      />
      <Button title="Szukaj po dostępności" onPress={handleSearchByAccessibility} />

      <TextInput
        placeholder="Szukaj po typie"
        value={type}
        onChangeText={setType}
        style={styles.input}
      />
      <Button title="Szukaj po typie" onPress={handleSearchByType} />

      {/* Renderowanie wyników */}
      <Text style={styles.resultsTitle}>Wyniki wyszukiwania:</Text>
      {searchResults.length === 0 ? (
        <Text>Brak wyników</Text>
      ) : (
        searchResults.map((park, index) => (
          <View key={index} style={styles.resultItem}>
            <Text>Nazwa: {park.name}</Text>
            <Text>Status: {park.status}</Text>
            <Text>Dzielnica: {park.district}</Text>
            <Text>Dostępność: {park.accessibility}</Text>
            <Text>Typ: {park.type}</Text>
          </View>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
  },
  resultsTitle: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default PocketParkSearchScreen;

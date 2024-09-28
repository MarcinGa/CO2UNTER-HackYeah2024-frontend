// screens/TownParkSearchScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList, Text } from 'react-native';

const TownParkSearchScreen = () => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [district, setDistrict] = useState('');
  const [accessibility, setAccessibility] = useState('');
  const [type, setType] = useState('');
  const [results, setResults] = useState([]);

  const handleSearchByName = async () => {
    const response = await fetch(`http://localhost:3000/data/town-parks/by-name/${name}`);
    const data = await response.json();
    setResults(data);
  };

  const handleSearchByStatus = async () => {
    const response = await fetch(`http://localhost:3000/data/town-parks/by-status/${status}`);
    const data = await response.json();
    setResults(data);
  };

  const handleSearchByDistrict = async () => {
    const response = await fetch(`http://localhost:3000/data/town-parks/by-district/${district}`);
    const data = await response.json();
    setResults(data);
  };

  const handleSearchByAccessibility = async () => {
    const response = await fetch(`http://localhost:3000/data/town-parks/by-accessibility/${accessibility}`);
    const data = await response.json();
    setResults(data);
  };

  const handleSearchByType = async () => {
    const response = await fetch(`http://localhost:3000/data/town-parks/by-type/${type}`);
    const data = await response.json();
    setResults(data);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nazwa"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <Button title="Wyszukaj po nazwie" onPress={handleSearchByName} />

      <TextInput
        placeholder="Status"
        value={status}
        onChangeText={setStatus}
        style={styles.input}
      />
      <Button title="Wyszukaj po statusie" onPress={handleSearchByStatus} />

      <TextInput
        placeholder="Dzielnica"
        value={district}
        onChangeText={setDistrict}
        style={styles.input}
      />
      <Button title="Wyszukaj po dzielnicy" onPress={handleSearchByDistrict} />

      <TextInput
        placeholder="Dostępność"
        value={accessibility}
        onChangeText={setAccessibility}
        style={styles.input}
      />
      <Button title="Wyszukaj po dostępności" onPress={handleSearchByAccessibility} />

      <TextInput
        placeholder="Typ"
        value={type}
        onChangeText={setType}
        style={styles.input}
      />
      <Button title="Wyszukaj po typie" onPress={handleSearchByType} />

      <FlatList
        data={results}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.resultItem}>
            <Text>{item.name}</Text>
            <Text>{item.status}</Text>
            <Text>{item.district}</Text>
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
  },
  resultItem: {
    marginBottom: 15,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

export default TownParkSearchScreen;

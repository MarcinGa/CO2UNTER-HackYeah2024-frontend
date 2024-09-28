// screens/PocketParkSearchScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList, Text } from 'react-native';

const PocketParkSearchScreen = () => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [district, setDistrict] = useState('');
  const [accessibility, setAccessibility] = useState('');
  const [type, setType] = useState('');
  const [results, setResults] = useState([]);

  const handleSearchByName = async () => {
    const response = await fetch(`http://localhost:3000/data/small-parks/by-name/${name}`);
    const data = await response.json();
    setResults(data);
  };

  const handleSearchByStatus = async () => {
    const response = await fetch(`http://localhost:3000/data/small-parks/by-status/${status}`);
    const data = await response.json();
    setResults(data);
  };

  const handleSearchByDistrict = async () => {
    const response = await fetch(`http://localhost:3000/data/small-parks/by-district/${district}`);
    const data = await response.json();
    setResults(data);
  };

  const handleSearchByAccessibility = async () => {
    const response = await fetch(`http://localhost:3000/data/small-parks/by-accessibility/${accessibility}`);
    const data = await response.json();
    setResults(data);
  };

  const handleSearchByType = async () => {
    const response = await fetch(`http://localhost:3000/data/small-parks/by-type/${type}`);
    const data = await response.json();
    setResults(data);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <Button title="Search by Name" onPress={handleSearchByName} />

      <TextInput
        placeholder="Status"
        value={status}
        onChangeText={setStatus}
        style={styles.input}
      />
      <Button title="Search by Status" onPress={handleSearchByStatus} />

      <TextInput
        placeholder="District"
        value={district}
        onChangeText={setDistrict}
        style={styles.input}
      />
      <Button title="Search by District" onPress={handleSearchByDistrict} />

      <TextInput
        placeholder="Accessibility"
        value={accessibility}
        onChangeText={setAccessibility}
        style={styles.input}
      />
      <Button title="Search by Accessibility" onPress={handleSearchByAccessibility} />

      <TextInput
        placeholder="Type"
        value={type}
        onChangeText={setType}
        style={styles.input}
      />
      <Button title="Search by Type" onPress={handleSearchByType} />

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

export default PocketParkSearchScreen;

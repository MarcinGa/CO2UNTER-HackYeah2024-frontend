import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';

const ParksPocket = () => {
  const [pocketParks, setPocketParks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPocketParks = async () => {
      try {
        const response = await fetch('http://localhost:3000/data/small-parks'); // Endpoint dla parków kieszonkowych
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPocketParks(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPocketParks();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Kieszonkowe Parki</Text>
      <FlatList
        data={pocketParks}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.parkItem}>
            <Text style={styles.parkName}>{item.name}</Text>
            <Text>District: {item.district}</Text>
            <Text>Area (ha): {item.areaHa}</Text>
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  parkItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  parkName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default ParksPocket;

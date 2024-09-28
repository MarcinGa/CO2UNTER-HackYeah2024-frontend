import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';

const ParksCity = () => {
  const [cityParks, setCityParks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCityParks = async () => {
      try {
        const response = await fetch('http://localhost:3000/data/town-parks'); // Endpoint dla parków miejskich
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCityParks(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCityParks();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Miejskie Parki</Text>
      <FlatList
        data={cityParks}
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

export default ParksCity;

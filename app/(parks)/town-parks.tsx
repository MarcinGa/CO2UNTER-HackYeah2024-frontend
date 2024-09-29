import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Linking,
  TouchableOpacity,
} from "react-native";

const PocketParks = () => {
  const [parksData, setParksData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchParksData = async () => {
      try {
        const response = await fetch(
          "https://co2unter-hackyeah2024-backend.onrender.com/data/town-parks"
        ); // Zaktualizuj z odpowiednim URL
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setParksData(data); // Przypisanie danych do stanu
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // Ustaw loading na false po zakończeniu
      }
    };

    fetchParksData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Ładuję dane...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Błąd: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: "100%" }}
        data={parksData}
        keyExtractor={(item) => item._id} // Zakładając, że masz unikalne id
        renderItem={({ item }) => (
          <View style={styles.parkItem}>
            <Text style={styles.parkName}>Nazwa: {item.name}</Text>
            <Text>Typ: {item.type}</Text>
            <Text>Dzielnica: {item.district}</Text>
            <Text>Dostępność: {item.accessibility}</Text>
            <Text>Wielkość (ha): {item.areaHa}</Text>
            <TouchableOpacity onPress={() => Linking.openURL(item.mpzpDane)}>
              <Text style={styles.link}>Więcej informacji</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    width: "100%",
  },
  parkItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
  },
  parkName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  link: {
    color: "blue",
    marginTop: 5,
  },
});

export default PocketParks;

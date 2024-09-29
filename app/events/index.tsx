import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  FlatList,
  ScrollView,
} from "react-native";

const EventForm = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [attendees, setAttendees] = useState("");
  const [eventId, setEventId] = useState(null); // Przechowuje ID wydarzenia
  const [events, setEvents] = useState([]); // Stan dla pobranych wydarzeń

  // Pobranie wydarzeń
  const fetchEvents = async () => {
    try {
      const response = await fetch(
        "https://co2unter-hackyeah2024-backend.onrender.com/events"
      );
      if (!response.ok) {
        throw new Error("Błąd pobierania danych");
      }
      const data = await response.json();
      setEvents(data); // Zapisanie pobranych danych w stanie
    } catch (error) {
      Alert.alert("Błąd", error.message, [{ text: "OK" }]);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSubmit = async () => {
    const formData = {
      name,
      type,
      location,
      attendees: Number(attendees), // Konwersja na numer
    };

    try {
      let response;

      if (eventId) {
        // Jeśli istnieje eventId, aktualizujemy wydarzenie
        response = await fetch(
          `https://co2unter-hackyeah2024-backend.onrender.com/events/${eventId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update the event");
        }

        Alert.alert("Sukces!", "Dane wydarzenia zostały zaktualizowane.", [
          { text: "OK" },
        ]);
      } else {
        // Tworzenie nowego wydarzenia
        response = await fetch(
          "https://co2unter-hackyeah2024-backend.onrender.com/events",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to submit the event");
        }

        const result = await response.json();
        const newEventId = result._id; // Otrzymane ID nowego wydarzenia

        setEventId(newEventId); // Ustawienie nowego ID w stanie

        Alert.alert("Sukces!", "Wydarzenie zostało dodane.", [{ text: "OK" }]);
      }

      // Resetowanie formularza
      setName("");
      setType("");
      setLocation("");
      setAttendees("");

      // Ponowne pobranie listy wydarzeń
      fetchEvents();
    } catch (error) {
      Alert.alert("Błąd", error.message, [{ text: "OK" }]);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Event Form</Text>

      <TextInput
        placeholder="Nazwa wydarzenia"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="Rodzaj wydarzenia"
        value={type}
        onChangeText={setType}
        style={styles.input}
      />

      <TextInput
        placeholder="Lokalizacja"
        value={location}
        onChangeText={setLocation}
        style={styles.input}
      />

      <TextInput
        placeholder="Liczba uczestników"
        value={attendees}
        onChangeText={setAttendees}
        keyboardType="numeric"
        style={styles.input}
      />

      <Button title="Submit" onPress={handleSubmit} />

      {/* Lista wydarzeń */}
      <Text style={styles.title}>Lista wydarzeń:</Text>
      <FlatList
        data={events}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <View style={styles.eventItem}>
            <Text>Nazwa: {item.name}</Text>
            <Text>Rodzaj: {item.type}</Text>
            <Text>Lokalizacja: {item.location}</Text>
            <Text>Uczestnicy: {item.attendees}</Text>
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
  eventItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default EventForm;

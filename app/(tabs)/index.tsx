import {
  Image,
  StyleSheet,
  Platform,
  View,
  Alert,
  ScrollView,
} from "react-native";
import { HelloWave } from "@/components/HelloWave";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text } from "@/components/ui/text";
import { useEffect, useState } from "react";
import { StaticImage } from "@/components/Images";

export default function HomeScreen() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getRandomImagePath = () => {
    const randomNumber = Math.floor(Math.random() * 5) + 1;

    return `parks/${randomNumber}.jpg`;
  };

  const image = getRandomImagePath();

  const fetchUserEmissionData = async () => {
    try {
      const response = await fetch(
        "https://co2unter-hackyeah2024-backend.onrender.com/data/users/66f90e988f8a4fbe921bf6dc/actions/calculate"
      );
      if (!response.ok) {
        throw new Error("Błąd pobierania danych");
      }

      const result = await response.json();
      setData(result); // Zapisanie pobranych danych w stanie
      setIsLoading(false); // Wyłączenie stanu ładowania
    } catch (error) {
      Alert.alert("Błąd", error.message, [{ text: "OK" }]);
      setIsLoading(false); // Upewnij się, że ładowanie przestanie się wyświetlać nawet w przypadku błędu
    }
  };

  useEffect(() => {
    fetchUserEmissionData();
  }, []);

  if (isLoading) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.header}>
          <Ionicons size={420} name="leaf" style={styles.headerImage} />
        </View>

        <ThemedView style={styles.content}>
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Witaj, Stefan!</ThemedText>
            <HelloWave />
          </ThemedView>

          <View>
            <Text style={styles.text}>Obliczanie...</Text>
          </View>
        </ThemedView>
      </ThemedView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons size={420} name="leaf" style={styles.headerImage} />
      </View>

      <ThemedView style={styles.content}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Witaj, Stefan!</ThemedText>
          <HelloWave />
        </ThemedView>

        <View>
          {data ? (
            <>
              <View style={styles.infoContainer}>
                <ThemedText style={styles.text}>
                  Do pochłonięcia wyprodukowanego{" "}
                  {Number(data.yourEmission.toFixed(2))} kg CO2 potrzeba
                  krakowskiego parku wielkości:
                </ThemedText>
              </View>

              <ThemedText type="label">{data.park}</ThemedText>
              <ThemedText style={styles.text}>W tym:</ThemedText>
              <ThemedText style={styles.text}>
                🌲 {data.drzewoI} młodych drzew oraz starych {data.stareDrzewoI}{" "}
                iglastych
              </ThemedText>
              <ThemedText style={styles.text}>
                🌳 {data.drzewoL} młodych drzew oraz starych {data.stareDrzewoL}{" "}
                liściastych
              </ThemedText>

              <ThemedText style={styles.text}>
                🌱 {data.sadzonka} sadzonek
              </ThemedText>

              <View style={styles.imageContainer}>
                <StaticImage source={image} />
              </View>
            </>
          ) : (
            <ThemedText style={styles.text}>
              Brak danych do wyświetlenia
            </ThemedText>
          )}
        </View>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: "100%",
    height: 640,
    marginTop: 16,
  },
  container: {
    flex: 1,
  },
  header: {
    height: 250,
    overflow: "hidden",
    backgroundColor: "#0e1d2a",
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
  },
  infoContainer: {
    marginBottom: 16,
  },
  text: {
    color: "var(--text-foreground)",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  headerImage: {
    color: "#8ef06b",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
});

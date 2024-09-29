import { Image, StyleSheet, View, Alert, ScrollView } from "react-native";
import { HelloWave } from "@/components/HelloWave";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StaticImage } from "@/components/Images";
import { useEffect, useState } from "react";

interface EmissionData {
  yourEmission: number;
  park: string;
  drzewoI: number;
  stareDrzewoI: number;
  drzewoL: number;
  stareDrzewoL: number;
  sadzonka: number;
}

export default function HomeScreen() {
  const [data, setData] = useState<EmissionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const getRandomImagePath = () => {
    const randomNumber = Math.floor(Math.random() * 5) + 1;
    return `parks/${randomNumber}.jpg`;
  };

  const fetchUserEmissionData = async () => {
    try {
      const response = await fetch(
        "https://co2unter-hackyeah2024-backend.onrender.com/data/users/66f901e73d1586ec8af1c2db/actions/calculate"
      );
      if (!response.ok) {
        throw new Error("Błąd pobierania danych");
      }

      const result = await response.json();
      setData(result);
      setIsLoading(false);
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserEmissionData();
  }, []);

  const image = getRandomImagePath();

  if (isLoading) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require("@/assets/images/partial-react-logo.png")}
            style={styles.reactLogo}
          />
        </View>

        <ThemedView style={styles.content}>
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Witaj, Stefan!</ThemedText>
            <HelloWave />
          </ThemedView>

          <View>
            <ThemedText style={styles.text}>Obliczanie...</ThemedText>
          </View>
        </ThemedView>
      </ThemedView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      </View>

      <ThemedView style={styles.content}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Witaj, Stefan!</ThemedText>
          <HelloWave />
        </ThemedView>

        <View>
          {errorMessage ? (
            <ThemedText style={styles.text}>{errorMessage}</ThemedText>
          ) : data ? (
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
    height: 200,
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
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});

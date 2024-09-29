import Ionicons from "@expo/vector-icons/Ionicons";
import { ScrollView, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import LinkCard from "@/components/LinkCard";
import { HelloWave } from "@/components/HelloWave";

export default function TabTwoScreen() {
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

        <ThemedText type="label">Kalkulatory:</ThemedText>

        <LinkCard
          route="/transport"
          icon="car-outline"
          title="Transport"
          description="Oblicz emisję środków transportu"
        ></LinkCard>
        <LinkCard
          route="/diet"
          icon="fast-food-outline"
          title="Dieta"
          description="Oblicz emisję spowodowaną dietą"
        ></LinkCard>
        <LinkCard
          route="/services"
          icon="storefront-outline"
          title="Usługi"
          description="Oblicz emisję spowodowaną korzystaniem z usług"
        ></LinkCard>
        <LinkCard
          route="/events"
          icon="flash-outline"
          title="Wydarzenia"
          description="Oblicz emisję wydarzeń kulturalnych"
        ></LinkCard>

        <ThemedText type="label">Parki miejskie:</ThemedText>

        <LinkCard
          route="/parks/town-parks"
          icon="leaf-outline"
          title="Parki miejskie"
          description="Znajdź parki miejskie"
        />
        <LinkCard
          route="/parks/town-park-search"
          icon="search-outline"
          title="Znajdź park miejski"
          description="Wyszukaj park miejski"
        />

        <ThemedText type="label">Parki kieszonkowe:</ThemedText>

        <LinkCard
          route="/parks/pocket-parks"
          icon="leaf-outline"
          title="Parki kieszonkowe"
          description="Znajdź parki kieszonkowe"
        />
        <LinkCard
          route="/parks/pocket-park-search"
          icon="search-outline"
          title="Znajdź park kieszonkowy"
          description="Wyszukaj park kieszonkowy"
        />
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

import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Card } from "@/components/ui/card";
import LinkCard from "@/components/LinkCard";

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#0e1d2a", dark: "#0e1d2a" }}
      headerImage={
        <Ionicons size={420} name="leaf" style={styles.headerImage} />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Kalkulatory emisji CO2</ThemedText>
      </ThemedView>
      <ThemedText>Wybierz jeden z Kalkulatorów</ThemedText>

      <LinkCard
        route="/transport"
        icon="car"
        title="Transport"
        description="Oblicz emisję środków transportu"
      ></LinkCard>
      <LinkCard
        route="/transport"
        icon="car"
        title="Transport"
        description="Oblicz emisję środków transportu"
      ></LinkCard>
      <LinkCard
        route="/transport"
        icon="car"
        title="Transport"
        description="Oblicz emisję środków transportu"
      ></LinkCard>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#8ef06b",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});

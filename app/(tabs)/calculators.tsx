import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
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
        <ThemedText type="title">Kalkulatory mojej emisji CO2</ThemedText>
      </ThemedView>
      <ThemedText style={styles.margin}>
        Dotychczasowa emisja: 3kg CO2
      </ThemedText>

      <ThemedText>Kalkulatory:</ThemedText>

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
        route="/services"
        icon="storefront-outline"
        title="Wydarzenia"
        description="Oblicz emisję wydarzeń kulturalnych"
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
  margin: {
    marginBottom: 24,
  },
});

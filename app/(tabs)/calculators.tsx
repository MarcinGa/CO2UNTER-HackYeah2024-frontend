import { ScrollView, StyleSheet, View, Image } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import LinkCard from "@/components/LinkCard";
import { HelloWave } from "@/components/HelloWave";

export default function TabTwoScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      </View>

      <ThemedView style={styles.content}>
        <ThemedText type="label">Kalkulatory:</ThemedText>

        <LinkCard
          route="/transport"
          icon="car-outline"
          title="Transport"
          description="Oblicz emisję środków transportu"
        />
        <LinkCard
          route="/diet"
          icon="fast-food-outline"
          title="Dieta"
          description="Oblicz emisję spowodowaną dietą"
        />
        <LinkCard
          route="/services"
          icon="storefront-outline"
          title="Usługi"
          description="Oblicz emisję spowodowaną korzystaniem z usług"
        />
        <LinkCard
          route="/events"
          icon="flash-outline"
          title="Wydarzenia"
          description="Oblicz emisję wydarzeń kulturalnych"
        />

        <ThemedText type="label">Parki miejskie:</ThemedText>

        <LinkCard
          route="/town-parks"
          icon="leaf-outline"
          title="Parki miejskie"
          description="Znajdź parki miejskie"
        />
        <LinkCard
          route="/town-park-search"
          icon="search-outline"
          title="Znajdź park miejski"
          description="Wyszukaj park miejski"
        />

        <ThemedText type="label">Parki kieszonkowe:</ThemedText>

        <LinkCard
          route="/pocket-parks"
          icon="leaf-outline"
          title="Parki kieszonkowe"
          description="Znajdź parki kieszonkowe"
        />
        <LinkCard
          route="/pocket-park-search"
          icon="search-outline"
          title="Znajdź park kieszonkowy"
          description="Wyszukaj park kieszonkowy"
        />
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 200,
    overflow: "hidden",
    backgroundColor: "#0e1d2a",
    justifyContent: "center", // Center the logo vertically
    alignItems: "center", // Center the logo horizontally
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
  },
  reactLogo: {
    height: 178,
    width: 290,
    position: "absolute",
    bottom: 0,
    left: 0,
  },
});

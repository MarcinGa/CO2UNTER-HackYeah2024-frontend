import {
  GlyphMap,
  Icon,
  IconProps,
} from "@expo/vector-icons/build/createIconSet";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Href, useRouter } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { Card, CardDescription, CardTitle } from "~/components/ui/card";
import { ThemedText } from "./ThemedText";

type LinkCardProps = {
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: Href;
};

export default function LinkCard({
  title,
  description,
  icon,
  route,
}: LinkCardProps) {
  const router = useRouter();

  return (
    <TouchableOpacity
      className="w-full max-w-sm p-4 bg-white rounded-lg border border-gray-300"
      onPress={() => router.push(route)}
    >
      <View className="flex flex-row gap-4">
        <Ionicons size={48} name={icon} />

        <View className="flex flex-col gap-2 max-w-full">
          <ThemedText type="subtitle">{title}</ThemedText>
          <CardDescription>{description}</CardDescription>
        </View>
      </View>
    </TouchableOpacity>
  );
}

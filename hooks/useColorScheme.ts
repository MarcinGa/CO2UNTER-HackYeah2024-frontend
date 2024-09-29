import { useColorScheme as useNativewindColorScheme } from "nativewind";

export function useColorScheme() {
  const { colorScheme, setColorScheme, toggleColorScheme } =
    useNativewindColorScheme();

  alert("1");

  return {
    colorScheme: colorScheme ?? "dark",
    isDarkColorScheme: colorScheme === "dark",
    setColorScheme,
    toggleColorScheme,
  };
}

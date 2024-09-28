import { Href, useRouter } from 'expo-router';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type LinkButtonProps = {
    route: Href,
    text: string
}

export default function LinkButton({ route, text }: LinkButtonProps) {
  const router = useRouter();

  return (
      <TouchableOpacity style={styles.button} onPress={() => router.push(route)}>
        <Text style={styles.buttonText}>{ text }</Text>
      </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

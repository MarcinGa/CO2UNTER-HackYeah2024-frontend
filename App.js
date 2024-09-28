import React from 'react';
import { View, Button, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importowanie ekranów
import IndywidualnieScreen from './screens/IndywidualnieScreen';
import TransportScreen from './screens/TransportScreen';
import UslugiScreen from './screens/UslugiScreen';
import PrzeliczScreen from './screens/PrzeliczScreen';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://example.com/your-logo.png' }} // Zastąp URL logo
        style={styles.logo}
      />
      <Button title="Indywidualnie" onPress={() => navigation.navigate('Indywidualnie')} />
      <Button title="Transport" onPress={() => navigation.navigate('Transport')} />
      <Button title="Usługi" onPress={() => navigation.navigate('Usługi')} />
      <Button title="Przelicz" onPress={() => navigation.navigate('Przelicz')} />
    </View>
  );
};

// Tworzenie stack navigatora
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Indywidualnie" component={IndywidualnieScreen} />
        <Stack.Screen name="Transport" component={TransportScreen} />
        <Stack.Screen name="Usługi" component={UslugiScreen} />
        <Stack.Screen name="Przelicz" component={PrzeliczScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 40,
  },
});

import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importowanie ekranów
import IndividualScreen from './screens/IndividualScreen';
import TransportForm from './screens/forms/TransportForm';
import HomeEnergyForm from './screens/forms/HomeEnergyForm';
import ConsumptionProductsForm from './screens/forms/ConsumptionProductsForm';
import ServicesScreen from './screens/ServicesScreen';
import ParksScreen from './screens/ParksScreen';
import TownParks from './screens/parks/TownParks';
import PocketParks from './screens/parks/PocketParks';
import PocketParkSearchScreen from './screens/PocketParkSearchScreen';
import TownParkSearchScreen from './screens/TownParkSearchScreen';

// Tworzenie stack navigatora
const Stack = createNativeStackNavigator();

// Komponent ekranu głównego
const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Przelicz produkcję CO2</Text>
      <Button title="Indywidualnie" onPress={() => navigation.navigate('Individual')} />

      <Text>Sprawdź dostępne dane</Text>
      <Button title="Parki" onPress={() => navigation.navigate('Parks')} />
      <Button title="Usługi" onPress={() => navigation.navigate('Services')} />
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Individual" component={IndividualScreen} />
        <Stack.Screen name="TransportForm" component={TransportForm} />
        <Stack.Screen name="HomeEnergyForm" component={HomeEnergyForm} />
        <Stack.Screen name="ConsumptionProductsForm" component={ConsumptionProductsForm} />
        <Stack.Screen name="Services" component={ServicesScreen} />
        <Stack.Screen name="Parks" component={ParksScreen} />
        <Stack.Screen name="TownParks" component={TownParks} />
        <Stack.Screen name="PocketParks" component={PocketParks} />
        <Stack.Screen name="PocketParkSearch" component={PocketParkSearchScreen} />
        <Stack.Screen name="TownParkSearch" component={TownParkSearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({ // Użycie StyleSheet do stylizacji
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
});

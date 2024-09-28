import React from 'react';
import { View, Button, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importowanie ekranów
import IndividualScreen from './screens/IndividualScreen';
import TransportForm from './screens/TransportForm';
import HomeEnergyForm from './screens/HomeEnergyForm';
import ConsumptionProductsForm from './screens/ConsumptionProductsForm';
import ServicesScreen from './screens/ServicesScreen';
import ParksScreen from './screens/ParksScreen';
import ParksCity from './screens/ParksCity'; // Nowy ekran parków miejskich
import ParksPocket from './screens/ParksPocket'; // Nowy ekran parków kieszonkowych

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://example.com/your-logo.png' }} // Zastąp URL logo
        style={styles.logo}
      />
      <Button title="Individual" onPress={() => navigation.navigate('Individual')} />
      <Button title="Transport" onPress={() => navigation.navigate('TransportForm')} />
      <Button title="Services" onPress={() => navigation.navigate('Services')} />
      <Button title="Parks" onPress={() => navigation.navigate('Parks')} /> {/* Zmiana z Convert na Parks */}
    </View>
  );
};

// Tworzenie stack navigatora
const Stack = createNativeStackNavigator();

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
        <Stack.Screen name="ParksCity" component={ParksCity} />
        <Stack.Screen name="ParksPocket" component={ParksPocket} />
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
    backgroundColor: '#fff',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 40,
  },
});

import React from 'react';
import { View, Button, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importowanie ekranów
import IndividualScreen from './screens/IndividualScreen';
import TransportForm from './screens/TransportForm'; // Nowy import
import HomeEnergyForm from './screens/HomeEnergyForm'; // Nowy import
import ConsumptionProductsForm from './screens/ConsumptionProductsForm'; // Nowy import
import ServicesScreen from './screens/ServicesScreen';
import ConvertScreen from './screens/ConvertScreen';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://example.com/your-logo.png' }} // Zastąp URL logo
        style={styles.logo}
      />
      <Button title="Individual" onPress={() => navigation.navigate('Individual')} />
      <Button title="Transport" onPress={() => navigation.navigate('Transport')} />
      <Button title="Services" onPress={() => navigation.navigate('Services')} />
      <Button title="Convert" onPress={() => navigation.navigate('Convert')} />
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
        <Stack.Screen name="Convert" component={ConvertScreen} />
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

// screens/ParksScreen.js
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
// import { router } from 'expo-router';
import LinkButton from '@/components/LinkButton';

const ParksScreen = () => {
  return (
    <View style={styles.container}>
      <LinkButton route="/parks/town-parks">Parki miejskie</LinkButton>
      <LinkButton route="/parks/pocket-parks">Parki kieszonkowe</LinkButton>
      <LinkButton route="/parks/pocket-park-search">Znajdź park kieszonkowy</LinkButton>
      <LinkButton route="/parks/town-park-search">Znajdź park kieszonkowy</LinkButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ParksScreen;

import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

import LinkButton from '@/components/LinkButton';

const IndividualScreen = () => {
  return (
    <View style={styles.container}>
      <LinkButton route="/transport">Transport</LinkButton>
      <LinkButton route="/home-energy">Energia domowa</LinkButton>
      <LinkButton route="/consumption">Transport</LinkButton>
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

export default IndividualScreen;

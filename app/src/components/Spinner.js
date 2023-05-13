import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ActivityIndicator } from 'react-native';

const Spinner = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={'#00BCD4'} size="large" />
    </View>
  );
};

export default Spinner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});

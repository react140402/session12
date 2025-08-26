/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, Text, useColorScheme, View, TouchableOpacity } from 'react-native';
import { Button } from '@rneui/themed';
import Icon from '@react-native-vector-icons/material-design-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


function CounterScreen() {
  const isDarkMode = useColorScheme() === 'dark';
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    if (counter !== 0)
      saveData();
  }, [counter])

  useEffect(() => {
    loadData();
  }, [])

  async function loadData() {
    const data = await AsyncStorage.getItem('my-key');
    setCounter(Number(data));
  }

  async function saveData() {
    await AsyncStorage.setItem('my-key', counter.toString());
  }

  return (
    <>
      <Button style={styles.btn} onPress={() => setCounter(counter + 1)} >
        <Text></Text>
        <Icon name="plus-circle" color="white" />
      </Button>
      <Text>{counter}</Text>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btn: {
    backgroundColor: '#ccc',
    padding: 10
  },
});

export default CounterScreen;


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { I18nManager, StyleSheet, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomeTab from './src/screens/HomeTab';
import DrugStoreTab from './src/screens/DrugStoreTab';
import Icon from '@react-native-vector-icons/material-design-icons';
const Tab = createBottomTabNavigator();
import BootSplash from "react-native-bootsplash";
import { useEffect } from 'react';
import { useNetInfo } from "@react-native-community/netinfo";
import CameraTab from './src/screens/CameraTab';


I18nManager.forceRTL(true);
I18nManager.allowRTL(true);
function App() {
  const isDarkMode = useColorScheme() === 'dark';
  useEffect(() => {
    BootSplash.hide({ fade: true })

  }, [])

  const netinfo = useNetInfo();

  useEffect(() => {
    console.log(netinfo)
  }, [netinfo])


  const linking = {
    prefixes: [
      "app12://"
    ],
    config: {
      screens: {
        DrugStoresTab: 'DrugStores',
        DrugStoreDetailScreen: 'DrugStore/:id',
      },
    },
  };



  return (

    <NavigationContainer linking={linking}>

      <Tab.Navigator>
        <Tab.Screen name="HomeTab"
          component={HomeTab}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (<Icon name="home" size={size} color={color} />)
          }}
        />
        <Tab.Screen name="CameraTab" component={CameraTab}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (<Icon name="camera" size={size} color={color} />)
          }} />
        <Tab.Screen name="DrugStoresTab" component={DrugStoreTab}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (<Icon name="heart" size={size} color={color} />)
          }} />
      </Tab.Navigator>
    </NavigationContainer>
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

export default App;

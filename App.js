import { StyleSheet, Text, View, SafeAreaView, StatusBar } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { ThemeProvider } from "styled-components/native"
import RestaurantScreen from "./src/features/restaurants/screen/RestaurantScreen";
import { NavigationContainer } from "@react-navigation/native"
import { theme } from "./src/infrastructure/theme"
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { SafeArea } from "./src/utils/safe-area-component"
import Ionicons from "@expo/vector-icons/Ionicons"
import { restaurantsRequest } from "./src/services/restaurants/restaurant.service"
import { LocationContextProvider } from "./src/services/location/location.context";
import {
  useFonts,
  Oswald_400Regular,
} from '@expo-google-fonts/oswald';
import {
  useFonts as useLatoFonts,
  Lato_400Regular
} from '@expo-google-fonts/lato';
import { RestaurantContextProvider } from "./src/services/restaurants/restaurant.context";

export default function App() {

  const Tab = createMaterialBottomTabNavigator();
  let [oswaldLoaded] = useFonts({
    Oswald_400Regular
  })
  let [latoLoaded] = useLatoFonts({
    Lato_400Regular
  })

  if (!oswaldLoaded || !latoLoaded) {
    return null
  }

  const Settings = () => {
    return <SafeArea>
      <Text>Settings</Text>
    </SafeArea>
  }

  const Map = () => {
    return <SafeArea><Text>Map</Text></SafeArea>
  }

  restaurantsRequest()

  return (
    <>
      <ThemeProvider theme={theme}>
        <LocationContextProvider>

          <RestaurantContextProvider >
            <NavigationContainer>
              <PaperProvider>
                {/* <RestaurantScreen /> */}
                {/* <StatusBar style="auto" /> */}
                <Tab.Navigator
                  screenOptions={({ route }) => ({
                    tabBarActiveTintColor: 'white',
                    tabBarInactiveTintColor: 'white',
                    tabBarActiveTintColor: 'gray',
                    tabBarStyle: {
                      backgroundColor: "red",
                    },
                    tabBarIcon: ({ focused, color, size }) => {
                      let iconName;

                      if (route.name === 'Restaurants') {
                        iconName = 'md-restaurant'
                        size = 20;
                        if (focused) color = "tomato"
                      } else if (route.name === 'Settings') {
                        iconName = 'md-settings'
                        size = 20;
                        if (focused) color = "tomato"
                      }
                      else if (route.name === 'Map') {
                        iconName = 'md-map'
                        size = 20;
                        if (focused) color = "tomato"
                      }
                      // You can return any component that you like here!
                      return <Ionicons name={iconName} size={size} color={color} />;
                    },
                  })}
                  tabBarOptions={{
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'gray',
                    tabBarActiveTintColor: 'tomato',
                  }}
                >
                  <Tab.Screen name="Restaurants" component={RestaurantScreen} />
                  <Tab.Screen name="Map" component={Map} />
                  <Tab.Screen name="Settings" component={Settings} />
                </Tab.Navigator>
              </PaperProvider>
            </NavigationContainer>
          </RestaurantContextProvider>
        </LocationContextProvider>
      </ThemeProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight,
    backgroundColor: "white",
  },
  search: {
    padding: 10,
  },
  list: {
    flex: 1,
    padding: 10,
    backgroundColor: "lightblue",
  },
});

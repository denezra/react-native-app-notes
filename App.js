import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import ProductListing from "./screens/productListing";
import ProductDetails from "./screens/productDetails";
import Favorites from "./screens/favorites";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProductContext from "./context";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const BottomsTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{ title: "List of Products" }}
        name="productListing"
        component={ProductListing}
      />
      <Tab.Screen
        options={{ title: "Favorites" }}
        name="favorites"
        component={Favorites}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <ProductContext>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: "#ffffff",
              },
              contentStyle: {
                backgroundColor: "#220577dd",
              },
            }}
          >
            <Stack.Screen
              options={{ headerShown: false }}
              name="bottomTabs"
              component={BottomsTabs}
            />
            <Stack.Screen
              options={{
                title: "Product Details",
              }}
              name="productDetails"
              component={ProductDetails}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </ProductContext>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";

// Task Screens
import LargeListScreen from "./screen/LargeList";       // Task 1
import ProductListScreen from "./screen/ProductScreen"; // Task 2
import CartScreen from "./screen/CartScreen";           // Task 2
import UsersScreen from "./screen/UserScreen";          // Task 3
import TokenScreen from "./screen/TokenScreen";         // Task 4
import UserDetailsScreen from "./screen/UserDetails"; // Task 5

// Store (for cart badge)
import { useCartStore } from "./store/cartStore";

// Assets
import { icons } from "./assets/assets";

// Types for stack navigation
export type RootStackParamList = {
  Products: undefined;
  Cart: undefined;
  UserDetails: { id: string };
};

// navigators
const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

// Stack for Products + Cart + UserDetails
function ShopStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#6200ee" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "600" },
      }}
    >
      <Stack.Screen
        name="Products"
        component={ProductListScreen}
        options={{ title: "Products" }}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{ title: "Your Cart" }}
      />
      <Stack.Screen
        name="UserDetails"
        component={UserDetailsScreen}
        options={{ title: "User Details" }}
      />
    </Stack.Navigator>
  );
}

// Linking config for deep links
const linking = {
  prefixes: ["myapp://"],
  config: {
    screens: {
      LargeList: "list",
      Shop: {
        screens: {
          Products: "products",
          Cart: "cart",
          UserDetails: "user/:id", // e.g. myapp://user/1
        },
      },
      Users: "users",
      Token: "token",
    },
  },
};

export default function App() {
  const cart = useCartStore((state) => state.cart);

  return (
    <NavigationContainer linking={linking}>
      {/* Bottom Tab Navigator */}
      <Tab.Navigator
        initialRouteName="LargeList"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: "#6200ee",
          tabBarInactiveTintColor: "gray",
          tabBarIcon: ({ size, color }) => {
            let icon;

            switch (route.name) {
              case "LargeList":
                icon = icons.largelist;
                break;
              case "Shop":
                icon = icons.shop;
                break;
              case "Users":
                icon = icons.user;
                break;
              case "Token":
                icon = icons.token;
                break;
              default:
                icon = icons.largelist;
            }

            return (
              <Image
                source={icon}
                style={{
                  width: size,
                  height: size,
                  tintColor: color,
                  resizeMode: "contain",
                }}
              />
            );
          },
        })}
      >
        <Tab.Screen
          name="LargeList"
          component={LargeListScreen}
          options={{ title: "Large List" }}
        />

        <Tab.Screen
          name="Shop"
          component={ShopStack}
          options={{
            title: "Shop",
            tabBarBadge: cart.length > 0 ? cart.length : undefined,
          }}
        />

        <Tab.Screen
          name="Users"
          component={UsersScreen}
          options={{ title: "Users" }}
        />

        <Tab.Screen
          name="Token"
          component={TokenScreen}
          options={{ title: "Secure Token" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

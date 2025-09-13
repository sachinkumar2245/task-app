import React from "react";

import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  Alert,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useCartStore, CartItem } from "../store/cartStore";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";


type ProductListScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Products"
>;

type Props = {
  navigation: ProductListScreenNavigationProp;
};

const products: CartItem[] = [
  { id: 1, name: "Laptop", quantity: 1 },
  { id: 2, name: "Headphones", quantity: 1 },
  { id: 3, name: "Keyboard", quantity: 1 },
];


const ProductListScreen: React.FC<Props> = ({ navigation }) => {
  
  const { cart, addToCart } = useCartStore();

  const handleAddToCart = (item: CartItem) => {
    addToCart(item);

    Alert.alert("Added to Cart", `${item.name} has been added to your cart.`);
  };

  return (

    <SafeAreaView style={styles.container}>

      <FlatList

        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (

          <View style={styles.productItem}>
            <Text style={styles.productName}>{item.name}</Text>
            <Button title="Add to Cart" onPress={() => handleAddToCart(item)} />
          </View>

        )}
      />

      
      {cart.length > 0 && (

        <View style={styles.cartButtonContainer}>
          <Button
            title={`Go to Cart (${cart.length})`}
            onPress={() => navigation.navigate("Cart")}
          />
        </View>

      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: "#fff"
   },

  productItem: {

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    marginBottom: 10,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
  },

  productName: { fontSize: 16, fontWeight: "500" },
  
  cartButtonContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  
});

export default ProductListScreen;
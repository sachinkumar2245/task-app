import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ListRenderItemInfo,
  Button,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useCartStore, CartItem } from "../store/cartStore";

const CartScreen: React.FC = () => {
  const { cart, removeFromCart, clearCart } = useCartStore();
  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const renderItem = ({ item }: ListRenderItemInfo<CartItem>) => (
    <View style={styles.cartItem}>
      <View>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.quantityText}>Qty: {item.quantity}</Text>
      </View>
      <Button
        title="Remove"
        color="#d9534f"
        onPress={() => removeFromCart(item.id)}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      <Text style={styles.totalText}>Total Items: {totalItemCount}</Text>

      {cart.length > 0 ? (
        <>
          <FlatList
            data={cart}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContent}
          />
          <View style={styles.clearButton}>
            <Button
              title="Clear Cart"
              color="#6c757d"
              onPress={clearCart}
            />
          </View>
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>🛒 Your cart is empty</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 16,
    marginBottom: 8,
    color: "#343a40",
  },
  totalText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "500",
    color: "#495057",
  },
  listContent: { paddingHorizontal: 16, paddingBottom: 80 },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 18,
    backgroundColor: "white",
    marginVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  productName: { fontSize: 16, fontWeight: "500", color: "#212529" },
  quantityText: { fontSize: 14, color: "#6c757d" },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { fontSize: 18, color: "gray" },
  clearButton: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#dee2e6",
    backgroundColor: "#fff",
  },
});

export default CartScreen;

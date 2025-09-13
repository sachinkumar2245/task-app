import React, {
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
  memo,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  ListRenderItemInfo,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { useCartStore } from "../store/cartStore";

type LargeListScreenNavigationProp = NativeStackNavigationProp<

  RootStackParamList,

  "LargeList"
>;

type Props = {

  navigation: LargeListScreenNavigationProp;
};

type ListItem = {

  id: string;
  title: string;
  description: string;

};

const PAGE_SIZE = 20;
const TOTAL_ITEMS = 5000;
const ITEM_HEIGHT = 100;
const LOAD_DELAY = 500;


const allItems: ListItem[] = Array.from({ length: TOTAL_ITEMS }, (_, i) => ({
  id: `item-${i + 1}`,
  title: `Item #${i + 1}`,
  description: `This is the description for item number ${i + 1}.`,
}));


const ListItemRow = memo(
  ({ item, onAdd }: { item: ListItem; onAdd: (item: ListItem) => void }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemDescription}>{item.description}</Text>
      <Button title="Add to Cart" onPress={() => onAdd(item)} />
    </View>
  )
);

const LargeListScreen: React.FC<Props> = ({ navigation }) => {

  const [data, setData] = useState<ListItem[]>([]);
  const [page, setPage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);

  const { cart, addToCart } = useCartStore();

  // Header buttons for navigation
  useLayoutEffect(() => {

    navigation.setOptions({

      headerRight: () => (
        
        <View style={styles.headerButtons}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Shop", { screen: "Products" })}
            style={styles.headerIcon}
          >
            <Text style={styles.emojiIcon}>🛍️</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Users")}
            style={styles.headerIcon}
          >
            <Text style={styles.emojiIcon}>👥</Text>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);


  const handleAddToCart = useCallback(
    (item: ListItem) => {

      addToCart({ id: item.id, name: item.title, quantity: 1 });

      Alert.alert("Added to Cart", `${item.title} has been added to your cart.`);
    },
    [addToCart]
  );

  const loadMoreItems = useCallback(() => {
    if (isLoading || data.length >= TOTAL_ITEMS) return;

    setIsLoading(true);
    setTimeout(() => {
      const start = (page - 1) * PAGE_SIZE;
      const end = start + PAGE_SIZE;
      const newItems = allItems.slice(start, end);

      if (newItems.length > 0) {
        setData((prev) => [...prev, ...newItems]);
        setPage((prev) => prev + 1);
      }
      setIsLoading(false);
    }, LOAD_DELAY);
  }, [page, isLoading, data]);

  useEffect(() => {
    loadMoreItems();
  }, []);


  const getItemLayout = (_: any, index: number) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  });

  return (
    <SafeAreaView style={styles.container}>

      <FlatList
        data={data}
        renderItem={({ item }: ListRenderItemInfo<ListItem>) => (
          <ListItemRow item={item} onAdd={handleAddToCart} />
        )}
        keyExtractor={(item) => item.id}
        onEndReached={loadMoreItems}
        onEndReachedThreshold={0.5}
        getItemLayout={getItemLayout}

        ListFooterComponent={
          isLoading ? (
            <ActivityIndicator style={{ marginVertical: 20 }} size="large" />
          ) : null
        }

        windowSize={10}
        initialNumToRender={PAGE_SIZE}
        maxToRenderPerBatch={PAGE_SIZE}

      />

      {cart.length > 0 && (
        <View style={styles.cartButtonContainer}>
          <Button
            title={`Go to Cart (${cart.length})`}
            onPress={() => navigation.navigate("Shop", { screen: "Cart" })}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: "#b2d289ff"
  },

  itemContainer: {
    height: ITEM_HEIGHT,
    paddingHorizontal: 16,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  itemTitle: { 
    fontSize: 18, 
    fontWeight: "bold" 
  },

  itemDescription: { 
    fontSize: 14, 
    color: "#555", 
    marginBottom: 8 
  },

  cartButtonContainer: { 
    position: "absolute", 
    bottom: 20, 
    right: 20 
  },

  headerButtons: { 
    flexDirection: "row", 
    alignItems: "center" 
  },

  headerIcon: { 
    marginLeft: 20 
  },

  emojiIcon: { 
    fontSize: 26 
  },
});

export default LargeListScreen;

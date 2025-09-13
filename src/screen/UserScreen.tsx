
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  ListRenderItemInfo,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NetInfo from "@react-native-community/netinfo";
import { loadCache, saveCache } from "../utils/cache"; //  new helper

type User = {
  id: number;
  name: string;
  email: string;
};

const API_URL = "https://jsonplaceholder.typicode.com/users";

const CACHE_KEY = "cachedUsers";

const UsersScreen: React.FC = () => {

  const [users, setUsers] = useState<User[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    fetchUsers();

  }, []);


// Fetching users from API or cache
  const fetchUsers = async () => {
    setIsLoading(true);

    setError(null);

    const { isConnected } = await NetInfo.fetch();

    if (isConnected) {
      try {
        const response = await fetch(API_URL);

        const data: User[] = await response.json();

        setUsers(data);
        
        await saveCache(CACHE_KEY, data); 
      } catch (e) {

        console.warn("Network fetch failed");
        await loadUsersFromCache("Could not fetch users online.");
      }
    } else {
      console.log("Offline. Loading from cache...");
      await loadUsersFromCache("No internet connection.");
    }

    setIsLoading(false);
  };

  const loadUsersFromCache = async (fallbackMessage: string) => {

    const cached = await loadCache<User[]>(CACHE_KEY);

    if (cached) {
      
      setUsers(cached);

    } else {
      setError(fallbackMessage);
    }
  };

  const renderItem = ({ item }: ListRenderItemInfo<User>) => (
    <View style={styles.userCard}>

      <Text style={styles.name}>{item.name}</Text>

      <Text style={styles.email}>{item.email}</Text>

    </View>
  );

  return (

    <SafeAreaView style={styles.container}>

      {isLoading ? (

        <ActivityIndicator size="large" color="#007bff" />

      ) : error ? (

        <Text style={styles.errorText}>{error}</Text>

      ) : (

        <FlatList
          data={users}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        />

      )}

    </SafeAreaView>

  );
};

const styles = StyleSheet.create({

  container: { flex: 1, backgroundColor: "#79a4ceff", justifyContent: "center" },

  userCard: {

    backgroundColor: "white",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#dee2e6",
  },

  name: { fontSize: 18, fontWeight: "bold" },

  email: { fontSize: 14, color: "gray", marginTop: 4 },

  errorText: {
    
    textAlign: "center",
    color: "red",
    fontSize: 16,
    paddingHorizontal: 20,
  },

});

export default UsersScreen;

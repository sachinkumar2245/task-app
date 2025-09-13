import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, Alert, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { saveToken, getToken, clearToken } from "../services/tokenService";

const DUMMY_TOKEN = "dummy-auth-token-12345-abcdef";

const TokenScreen: React.FC = () => {

  
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load token on mount

  useEffect(() => {
    const loadTokenFromStorage = async () => {

      const storedToken = await getToken();

      if (storedToken) setToken(storedToken);

      setIsLoading(false);
    };
    loadTokenFromStorage();
  }, []);

  const handleSaveToken = async () => {
    await saveToken(DUMMY_TOKEN);
    setToken(DUMMY_TOKEN);
    Alert.alert("Success", "Dummy token has been securely stored!");
  };

  const handleClearToken = async () => {
    await clearToken();
    setToken(null);
    Alert.alert("Success", "Token has been cleared.");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Secure Token</Text>
        <Text style={styles.description}>
          This screen demonstrates storing an auth token in the device's secure
          keychain. The token will persist even if you restart the app.
        </Text>

        <View style={styles.tokenContainer}>
          <Text style={styles.tokenLabel}>Retrieved Token:</Text>
          {isLoading ? (
            <Text style={styles.tokenValue}>Loading...</Text>
          ) : (
            <Text style={styles.tokenValue}>
              {token || "No token found."}
            </Text>
          )}
        </View>

        {!token && <Button title="Save Dummy Token" onPress={handleSaveToken} />}

        {token && <Button title="Clear Token" onPress={handleClearToken} />}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  content: {
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },

  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 24,
  },

  tokenContainer: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  tokenLabel: {
    fontSize: 12,
    color: "#888",
    marginBottom: 4,
  },

  tokenValue: {
    fontSize: 16,
    fontFamily: Platform.select({ ios: "Menlo", android: "monospace" }),
    color: "#333",
  },

});

export default TokenScreen;

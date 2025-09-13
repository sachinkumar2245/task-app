import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../App";

// Defined route type for this screen
type UserDetailsRouteProp = RouteProp<RootStackParamList, "UserDetails">;

type Props = {
  route: UserDetailsRouteProp;
};

const UserDetailsScreen: React.FC<Props> = ({ route }) => {

  const { id } = route.params;

  return (
    <View style={styles.container}>

      <Text style={styles.title}>User Details</Text>
      <Text style={styles.label}>User ID:</Text>
      <Text style={styles.value}>{id}</Text>

      <Text style={styles.hint}>

        (This screen was opened via deep link or navigation)
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#b2d289ff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#222",
  },

  label: {
    fontSize: 16,
    color: "#666",
  },

  value: {
    fontSize: 22,
    fontWeight: "600",
    marginTop: 4,
    marginBottom: 20,
    color: "#6200ee",
  },

  hint: {
    fontSize: 12,
    color: "#999",
    marginTop: 30,
    textAlign: "center",
  },
  
});

export default UserDetailsScreen;

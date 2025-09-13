import AsyncStorage from "@react-native-async-storage/async-storage";

// saving data as string
export const saveCache = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Failed to save cache:", e);
  }
};

// parsing data back to ts
export const loadCache = async <T>(key: string): Promise<T | null> => {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error("Failed to load cache:", e);
    return null;
  }
};

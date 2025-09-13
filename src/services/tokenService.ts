import * as Keychain from "react-native-keychain";

// key to identify the token in the keychain
const USERNAME = "auth-user"; 


export const saveToken = async (token: string): Promise<void> => {
  try {
    await Keychain.setGenericPassword(USERNAME, token);
  } catch (error) {
    console.error("Failed to save the token to keychain.", error);
  }
};


export const getToken = async (): Promise<string | null> => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      return credentials.password; // token lives here
    }
    return null;
  } catch (error) {
    console.error("Failed to get the token from keychain.", error);
    return null;
  }
};


export const clearToken = async (): Promise<void> => {
  try {
    await Keychain.resetGenericPassword();
  } catch (error) {
    console.error("Failed to clear the token from keychain.", error);
  }
};

import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import useEphemeralKeyPair from "../hooks/useEphemeralKeyPair";
import { useKeylessAccount } from "../context/AptosContext";
import { WebView } from "react-native-webview";

const SignInWithGoogle = () => {
  const { keylessAccount, setKeylessAccount } = useKeylessAccount();
  const ephemeralKeyPair = useEphemeralKeyPair();

  const collapseAddress = (address: string) => {
    return address.replace(/^0x/, "").replace(/^0+/, "");
  };

  const getRedirectUri = () => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}/callback`;
    }
    return process.env.NODE_ENV === "development"
      ? "http://localhost:3000/callback"
      : process.env.NEXT_PUBLIC_VERCEL_URL + "/callback";
  };

  const [googleClientId, setGoogleClientId] = useState(
    process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID
  );

  const redirectUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${getRedirectUri()}&response_type=id_token&scope=openid%20email%20profile&nonce=${ephemeralKeyPair.nonce}`;

  const disconnect = () => {
    setKeylessAccount(null);
    Alert.alert("Successfully disconnected account");
  };

  if (keylessAccount) {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={disconnect}>
          {/* <GoogleLogo /> */}
          <Text>
            {collapseAddress(keylessAccount.accountAddress.toString())}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => {}}>
        {/* <GoogleLogo /> */}
        <Text>Sign in with Google</Text>
      </TouchableOpacity>
      <WebView source={{ uri: redirectUrl }} style={{ marginTop: 20 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
  },
});

export default SignInWithGoogle;

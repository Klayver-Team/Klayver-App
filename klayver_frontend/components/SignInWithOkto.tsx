import { View, Text, TouchableOpacity } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { authenticate } from "rn-okto-sdk";
import React from "react";

const webClientId =
  "923922876614-gtgqvmdjtsica4on7g17jtphhjr2o3ef.apps.googleusercontent.com";
GoogleSignin.configure({
  // Update scopes as needed in your app
  scopes: ["email", "profile"],
  webClientId,
});

interface Wallet {
  network_name: string;
  address: string;
}

const SignInWithOkto = () => {
  async function handleGoogleSignIn() {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();

      const { idToken } = response;
      if (idToken) {
        authenticate(idToken, (result, error) => {
          if (result) {
            const wallet: Wallet[] = JSON.parse(result);
            console.log(result);
          }
        });
      }
    } catch (error) {
      console.log("Something went wrong. Please try again");
    }
  }
  return (
    <TouchableOpacity
      onPress={handleGoogleSignIn}
      className="bg-[#FB8B04] w-full rounded-[20px] py-2.5 items-center"
    >
      <Text className="text-[#fff]">Connect with Google</Text>
    </TouchableOpacity>
  );
};

export default SignInWithOkto;

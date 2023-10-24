import React from "react";
import { Stack } from "expo-router";
import { Text, View } from "../../../components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Image } from "react-native";
import { logo } from "../../../assets/images";
import UserAvatar from "react-native-user-avatar";

export default function _HomeLayout() {
  return (
    <Stack
      screenOptions={{
        header: () => (
          <SafeAreaView>
            <StatusBar style="auto" />
            <View className="flex-row items-center justify-between h-[65px] px-4">
              <Image className="object-contain" source={logo} />
              <UserAvatar size={32} name="Avishay Bar" />
            </View>
          </SafeAreaView>
        ),
        // headerShown: false
      }}
    />
  );
}

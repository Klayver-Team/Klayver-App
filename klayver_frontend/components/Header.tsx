import { View, Text, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { logo } from "../assets/images";

const Header = () => {
  return (
    <View className="flex-row items-center bg-white justify-between h-[65px] px-4">
      <Image className="object-contain" source={logo} />
      <Image
        source={{
          uri: "https://images.pexels.com/photos/3938465/pexels-photo-3938465.jpeg?auto=compress&cs=tinysrgb&w=1600",
        }}
        className="w-[40px] h-[40px] object-contain rounded-full"
      />
    </View>
  );
};

export default Header;

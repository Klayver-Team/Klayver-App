import React, { useState } from "react";
import { StyleSheet, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfilePage from "../../components/ProfilePage";
import WalletPage from "../../components/WalletPage";
import PostPage from "../../components/PostPage";
import { ScrollView } from "react-native-gesture-handler";

export default function TabTwoScreen() {
  const [activeButton, setActiveButton] = useState(0);

  const handlePress = (buttonIndex: number) => {
    setActiveButton(buttonIndex);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Pressable
          className={`${
            activeButton === 0
              ? "bg-[#f4f4f4] text-black font-bold rounded-[30px]"
              : "text-[#828282] font-normal"
          } px-[30px] py-[12px]`}
          onPress={() => handlePress(0)}
        >
          <Text>Profile</Text>
        </Pressable>
        <Pressable
          className={`${
            activeButton === 1
              ? "bg-[#f4f4f4] text-Black font-bold rounded-[30px]"
              : "text-[#828282] font-normal"
          } px-[30px] py-[12px]`}
          onPress={() => handlePress(1)}
        >
          <Text>Wallet</Text>
        </Pressable>
        <Pressable
          className={`${
            activeButton === 2
              ? "bg-[#f4f4f4] text-Black font-bold rounded-[30px]"
              : "text-[#828282] font-normal"
          } px-[30px] py-[12px]`}
          onPress={() => handlePress(2)}
        >
          <Text>Post</Text>
        </Pressable>
      </View>
      <ScrollView
        style={{ marginBottom: 1, minHeight: "100%" }}
        contentContainerStyle={{ marginBottom: 128 }}
      >
        {activeButton === 0 && <ProfilePage />}
        {activeButton === 1 && <WalletPage />}
        {activeButton === 2 && <PostPage />}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    height: 46,
    marginHorizontal: 46,
    borderRadius: 23,
  },
  button: {
    padding: 10,
  },
  activeButton: {
    backgroundColor: "#f4f4f4",
    borderRadius: 23,
  },
});

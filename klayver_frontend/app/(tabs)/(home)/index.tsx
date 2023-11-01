import { View, Text, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import Header from "../../../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { logo } from "../../../assets/images";
import { router, useRouter } from "expo-router";
import PostCard from "../../../components/PostCard";

const Home = () => {
  const [allPost, setAllPost] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
  ]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      {/** Heaader */}
      <View className="flex-row items-center bg-white justify-between h-[65px] px-4 w-full">
        <Image className="object-contain" source={logo} />
        <Image
          source={{
            uri: "https://images.pexels.com/photos/3938465/pexels-photo-3938465.jpeg?auto=compress&cs=tinysrgb&w=1600",
          }}
          className="w-[40px] h-[40px] object-contain rounded-full"
        />
      </View>
      {/** Post Feed */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={{
          marginTop: 12,
          flex: 1,
          minHeight: "100%",
        }}
        contentContainerStyle={{
          paddingHorizontal: 10,
          paddingBottom: 45,
        }}
      >
        {allPost.map((item, i) => (
          <PostCard item={item} key={i} />
        ))}
      </ScrollView>
      <Pressable
        onPress={() => router.push("/createPost")}
        className="absolute z-[99999] bottom-6 right-2 bg-[#F98908] py-[12px] px-[14px] flex-row items-center space-x-4 rounded-[30px]"
      >
        <FontAwesome name="plus" color="#fff" />
        <Text className="text-white">Create a Klay</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Home;

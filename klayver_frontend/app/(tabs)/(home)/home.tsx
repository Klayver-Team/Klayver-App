import { View, Text, FlatList, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import UserAvatar from "react-native-user-avatar";
import { logo } from "../../../assets/images";
import { SafeAreaView } from "react-native-safe-area-context";

const PostCard = ({ item }: { item: number }) => {
  return (
    <View className="h-[462px] flex-1 mb-[15px] w-[350px] bg-white overflow-y-scroll mx-[10px] rounded-[10px] py-[20px] px-[10px]">
      <Text className="text-green-500">PostCard {item}</Text>
    </View>
  );
};

// const Header = () => {
//   return (
//     <SafeAreaView>
//       <View className="flex-row items-center justify-between bg-[#fff] h-[65px] px-4">
//         <Image className="object-contain" source={logo} />
//         <UserAvatar size={32} name="Avishay Bar" />
//       </View>
//     </SafeAreaView>
//   );
// };

const Home = () => {
  const [allPost, setAllPost] = useState([ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ]);

  return (
    <View className="flex-1">
      <FlatList
        data={allPost}
        renderItem={({ item }) => <PostCard item={item} />}
        style={{ flex: 1, gap: 10, paddingVertical: 10, marginBottom: 1 }}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        showsVerticalScrollIndicator={false}
        bounces={false}
        keyExtractor={(item) => item.toString()}
      />
      <Pressable className="absolute z-[99999] bottom-4 right-2 bg-[#F98908] py-[12px] px-[14px] flex-row items-center space-x-4 rounded-[30px]">
        <FontAwesome name="plus" color="#fff" />
        <Text className="text-white">Create a Klay</Text>
      </Pressable>
    </View>
  );
};

export default Home;

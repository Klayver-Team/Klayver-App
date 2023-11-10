import { View, Text } from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import PostCard from "../Cards/PostCard";

const PostPage = () => {
  const [userPost, setUserPost] = useState([1, 2, 3, 4, 5]);
  return (
    <View className="min-h-screen items-center">
      <ScrollView
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 16 }}
      >
        {userPost.map((item, i) => (
          <PostCard key={i} item={item} />
        ))}
      </ScrollView>
    </View>
  );
};

export default PostPage;

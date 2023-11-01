import {
  View,
  Text,
  Pressable,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";

const CreatePost = () => {
  const [selectedImages, setSelectedImage] = useState([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
  ]);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <SafeAreaView
          style={{
            flex: 1,
            marginHorizontal: 10,
          }}
        >
          <View className="flex-row items-center justify-between px-[20px]">
            <FontAwesome onPress={() => router.back()} name="close" size={24} />
            <Pressable className="bg-Orange px-[36.425px] py-[18.21px] rounded-[20px]">
              <Text className="text-white text-[16px]">Post Klay</Text>
            </Pressable>
          </View>

          <View className="mt-[46px] space-x-[16px] flex-row items-start">
            <Image
              source={{
                uri: "https://images.pexels.com/photos/3938465/pexels-photo-3938465.jpeg?auto=compress&cs=tinysrgb&w=1600",
              }}
              className="w-[32px] h-[32px] object-contain rounded-[20px] mt-[15px]"
            />
            <TextInput
              keyboardType="default"
              keyboardAppearance="light"
              multiline={true}
              numberOfLines={4}
              style={{
                height: 100, // You can adjust this
                padding: 10, // You can adjust this
              }}
              className="text-[16px] font-normal text-Black flex-1"
              selectionColor="#FFA500"
              maxLength={500} // You can adjust this
              placeholder="Say something and make a Klay"
            />
          </View>

          {/** slected Image */}
          <Image
            source={{
              uri: "https://images.pexels.com/photos/3938465/pexels-photo-3938465.jpeg?auto=compress&cs=tinysrgb&w=1600",
            }}
            className="w-full h-[250px] object-cover rounded-[20px] mt-[15px]"
          />

          {/** select or add an image */}

          <View className=" flex-row space-x- absolute bottom-6  items-center">
            <ScrollView horizontal style={{ width: "100%" }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View className="space-y-5">
                  <Pressable className="w-[95px] h-[44px] bg-white rounded-[10px] flex-row items-center justify-center">
                    <FontAwesome name="camera" size={24} color="gray" />
                  </Pressable>

                  <Pressable className="w-[95px] h-[44px] bg-white flex-row rounded-[10px] items-center justify-center">
                    <FontAwesome name="image" size={24} color="gray" />
                  </Pressable>
                </View>
              </View>
              {selectedImages.map((item, i) => (
                <View key={i} className="px-[10px]">
                  <Image
                    source={{
                      uri: "https://images.pexels.com/photos/3938465/pexels-photo-3938465.jpeg?auto=compress&cs=tinysrgb&w=1600",
                    }}
                    className="w-[95px] h-[95px] object-contain rounded-[20px]"
                  />
                </View>
              ))}
            </ScrollView>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default CreatePost;

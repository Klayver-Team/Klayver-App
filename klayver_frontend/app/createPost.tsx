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
import * as ImagePicker from "expo-image-picker";
import { uploadFile } from "@mintbase-js/storage";
import * as FileSystem from "expo-file-system";

const CreatePost = () => {
  const [selectedImages, setSelectedArrayOfImages] = useState<string[]>([]);
  // const [selectedImage, setSelectedImage] = useState(null);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      allowsMultipleSelection: true,
      selectionLimit: 1,
    });

    if (!result.canceled) {
      const fileUri = result.assets[0].uri;
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      if (fileInfo.exists) {
        const fileData = await FileSystem.readAsStringAsync(fileUri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        const blob = await fetch(`data:image/jpg;base64,${fileData}`).then(
          (r) => r.blob()
        );
        const file = new File([blob], "filename.jpg", { type: "image/jpg" });
        const uploadResult = await uploadFile(file);
        const imageUrl = `https://arweave.net/${uploadResult.id}`;
        // setSelectedArrayOfImages(imageUrl);
      }
    } else {
      alert("You did not select any image.");
    }
  };

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

                  <Pressable
                    onPress={pickImageAsync}
                    className="w-[95px] h-[44px] bg-white flex-row rounded-[10px] items-center justify-center"
                  >
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

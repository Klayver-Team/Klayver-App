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
  Modal,
  Alert,
  ProgressBarAndroidComponent,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase";
import { useKlayProfile } from "../utils/KlayverProfile";

const createPost = () => {
  const [selectedImages, setSelectedArrayOfImages] = useState<string>("");
  const [post, setPost] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { createAKlay } = useKlayProfile();

  const metadata = {
    contentType: "image/jpeg",
  };

  const handleSubmit = async () => {
    createAKlay(selectedImages, post);
  };

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      allowsMultipleSelection: true,
      selectionLimit: 1,
    });

    if (!result.canceled) {
      const storageRef = ref(storage, "images/" + result.assets[0].fileName);
      const response = await fetch(result.assets[0].uri);
      const blob = await response.blob();

      const uploadTask = uploadBytesResumable(storageRef, blob, metadata);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
          setIsModalVisible(true);
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.error("Upload failed:", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setSelectedArrayOfImages(downloadURL);
            setIsModalVisible(false);
          });
        }
      );
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
            <Pressable
              onPress={handleSubmit}
              className="bg-Orange px-[36.425px] py-[18.21px] rounded-[20px]"
            >
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
              value={post}
              onChangeText={(text) => setPost(text)}
            />
          </View>

          {/** slected Image */}
          {selectedImages && (
            <Image
              source={{
                uri: selectedImages,
              }}
              className="w-full h-[250px] object-cover rounded-[20px] mt-[15px]"
            />
          )}

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
            </ScrollView>
          </View>

          <View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={isModalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setIsModalVisible(!isModalVisible);
              }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    padding: 20,
                    borderRadius: 10,
                  }}
                >
                  <Text>Uploading image...</Text>
                  {/* <ProgressBarAndroidComponent
                progress={uploadProgress}
                color="#0000ff"
              /> */}
                  <Text className="text-[16px] font-medium text-black">
                    {uploadProgress}%
                  </Text>
                </View>
              </View>
            </Modal>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default createPost;

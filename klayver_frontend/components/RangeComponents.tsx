import { View, Text, Pressable } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

type Props = {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};

const RangeComponents = ({ currentStep, setCurrentStep }: Props) => {
  return (
    <View className="flex-row items-center justify-center min-w-[60%] mt-[25px]">
      <Pressable
        className={`border-4 rounded-full p-2 ${
          currentStep === 0 ? "border-Orange" : "border-[#BDBDBD]"
        }`}
      >
        <FontAwesome
          name="briefcase"
          size={20}
          color={`${currentStep === 0 ? "#F88908" : "#BDBDBD"}`}
          // color="#F88908"
        />
      </Pressable>
      <View
        className={`border-dashed border-b w-[120px] h-[10px] border-black ${
          currentStep === 0 ? "border-Orange" : "border-[#BDBDBD]"
        }`}
      />
      <Pressable
        className={`border-4 rounded-full p-2 ${
          currentStep === 1 ? "border-Orange" : "border-[#BDBDBD]"
        }`}
      >
        <FontAwesome
          name="address-book"
          size={20}
          color={`${currentStep === 1 ? "#F88908" : "#BDBDBD"}`}
        />
      </Pressable>
      <View
        className={`border-dashed border-b w-[120px] h-[10px] border-black ${
          currentStep === 2 ? "border-Orange" : "border-[#BDBDBD]"
        }`}
      />
      <Pressable
        className={`border-4 rounded-full p-2 ${
          currentStep === 2 ? "border-Orange" : "border-[#BDBDBD]"
        }`}
      >
        <FontAwesome
          name="database"
          size={20}
          color={`${currentStep === 2 ? "#F88908" : "#BDBDBD"}`}
        />
      </Pressable>
    </View>
  );
};

export default RangeComponents;

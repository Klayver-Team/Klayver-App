import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import { logo } from "../../assets/images";
import { FontAwesome } from "@expo/vector-icons";

const ReviewCard = () => {
  const [rating, setRating] = useState([1, 2, 3, 4, 5]);
  return (
    <View className="w-full bg-[#f4f4f4] h-[132px] space-y-[16px] py-6 px-9 rounded-[20px]">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-start space-x-3">
          <Image
            source={{
              uri: "https://images.pexels.com/photos/3938465/pexels-photo-3938465.jpeg?auto=compress&cs=tinysrgb&w=1600",
            }}
            className="w-[40px] h-[40px] object-contain rounded-[20px]"
          />
          <View>
            <Text className="text-[16px] font-bold text-[#292929]">
              Ebbie Aden
            </Text>
            <Text className="text-[14px] text-[#BDBDBD] font-normal">
              October 12, 2023
            </Text>
          </View>
        </View>
        <View className="flex-row">
          {rating.map((item, index) => (
            <FontAwesome key={index} name="star" size={20} color="orange" />
          ))}
        </View>
      </View>
      <Text className="text-[15px] font-nromal leading-[24px] text-[#292929]">
        The developer did an outstanding job, delivering a flawless and
        innovative solution that exceeded my expectations
      </Text>
    </View>
  );
};

export default ReviewCard;

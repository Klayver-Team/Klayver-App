import { View, Text, Pressable } from "react-native";
import React from "react";
import { Finance, FinanceTexts } from "../../utils/data";
import VectorIcon from "../../assets/icons/Vector.svg";
import { Link, useNavigation } from "expo-router";
const finance = () => {
  return (
    <View className="my-11 mx-7 ">
      <Text className="text-2xl font-semibold text-center  py-10">Finance</Text>

      {FinanceTexts.map((item: Finance) => (
        <View
          key={item.id}
          className="bg-[#fff] px-5 py-3 pt-6 mb-8 flex flex-col rounded-[20px]"
        >
          <Text className="text-3xl">{item.icon}</Text>
          <Text className="text-xl font-bold">{item.title}</Text>
          <Text className="text-lg font-light">{item.body}</Text>
          <Link href={item.path} className="flex flex-row mt-4 mb-4">
            <Text className="text-lg py-3 text-[#fb8804]">
              {item.buttontext}
            </Text>
            <View className="py-2.5 px-2">
              <VectorIcon />
            </View>
          </Link>
        </View>
      ))}
    </View>
  );
};

export default finance;

import { View, Text } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const TalentCard = () => {
  return (
    <View className="items-center mt-[26px]">
      <LinearGradient
        colors={["#E6152B", "#16CFAC", "#546AD2", "#A245BF", "#BD0B66"]}
        //   start={{ x: 0.1, y: 0.2 }}
        //   end={{ x: 0.4, y: 0.2 }}
        //   locations={[0.5, 0.8]}
        className="w-[349px] h-[124px] rounded-[20px]"
      >
        <Text>TalentCard</Text>
      </LinearGradient>
    </View>
  );
};

export default TalentCard;

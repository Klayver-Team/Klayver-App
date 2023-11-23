import React, { useState } from "react";
import { View, TextInput, Text, Button } from "react-native";

interface InputFieldProps {
  label: string;
  balance?: string;
  currency?: string;
  iconText: string;
  value: string;
  placeholder: string;
  setValue: any;
}
const TextAreaField: React.FC<InputFieldProps> = ({
  label,
  currency,
  iconText,
  value,
  placeholder,
  setValue,
  balance,
}) => {
  //  const [text, setText] = useState(''); // Initialize the input value with an empty string

  return (
    <View className="mb-5">
      <View className="flex flex-row justify-between">
        <Text className="pb-5 text-lg">{label}</Text>
      </View>
      <View className="bg-[#fff] px-4 flex flex-row rounded-[30px]">
        <TextInput
          onChangeText={(inputText) => setValue(inputText)}
          value={value}
          placeholderTextColor={"#828282"}        
          placeholder={placeholder}
          multiline={true}        
          className="text-sm h-[150px] py-6 w-[90%]"
        />
        <Text className="flex text-[#FB8B04] relative right-3 top-2 left-3 mx-1 font-bold text-xl justify-end ">
          {iconText}
        </Text>
      </View>
    </View>
  );
};

export default TextAreaField;

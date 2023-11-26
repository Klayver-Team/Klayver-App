import React, { ReactComponentElement, useState } from "react";
import { View, TextInput, Text, Button } from "react-native";

interface InputFieldProps {
  label: string;
  balance?: string;
  currency?: string;
  rightIconText?: string;
  iconText: string;
  enabled?: boolean;
    value: any;
    onChange?: any;
  fieldId?: number | string,
  placeholder: string;
 // setValue: any;
}
const InputField: React.FC<InputFieldProps> = ({
  label,
  rightIconText,
  iconText,
  value,
  enabled,
  placeholder,
   // setValue,
  onChange,
  fieldId,
  balance,
}) => {
  //  const [text, setText] = useState(''); // Initialize the input value with an empty string

  return (
    <View className="mb-5">
      <View className="flex flex-row justify-between">
        <Text className="pb-5 text-lg">{label}</Text>
        {balance && <Text className="pb-5 text-lg">Balance: {balance}</Text>}
      </View>
      <View className="bg-[#fff] p-8 flex flex-row justify-around text-[#5c2684] rounded-[30px]">
        <Text className="flex text-[#828282] relative right-0 top-1 mr-8 font-bold text-xl justify-end ">
          {rightIconText}
        </Text>
        <TextInput
          //onChangeText={(inputText) => setValue(inputText)}
          onChangeText={onChange}
          value={value}
          editable={enabled}
          placeholderTextColor={"#828282"}
          placeholder={placeholder}
          className="text-sm h-8 text-break w-[90%]"
        />
        <Text className="flex text-[#FB8B04] relative right-3 top-2 left-3 ml-9 mr-4 font-bold text-xl justify-end ">
          {iconText}
        </Text>
      </View>
    </View>
  );
};

export default InputField;

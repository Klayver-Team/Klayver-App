import React, { useState } from 'react';
import { View, TextInput, Text, Button } from 'react-native';


interface InputFieldProps {
    label: string;
    balance?: string;
    currency?: string;
    value:  string ,
    setValue: any,
  }
const InputField: React.FC<InputFieldProps> = ({label, currency, value,setValue, balance}) => {
  //  const [text, setText] = useState(''); // Initialize the input value with an empty string
  
    return (
      <View className='mb-5'>
        <View className='flex flex-row justify-between'>
         <Text className='pb-5 text-lg'>{label}</Text>
         {
        balance &&  <Text className='pb-5 text-lg'>Balance: {balance}</Text>
        }
         </View>
         <View  className='bg-[#fff] p-8 flex flex-row justify-around text-[#5c2684] rounded-[30px]'>
        <TextInput
          onChangeText={(inputText) => setValue(inputText)}
          value={value}

          placeholderTextColor={"#828282"}
          placeholder={label.toLowerCase() === "to" ? "Enter receiver's address": `Enter ${currency} amount`  }
          className="text-lg h-8 w-[90%]"
        />
        <Text className='flex text-[#FB8B04] relative right-3 top-2 left-3 mx-1 font-bold text-xl justify-end ' >{
            label.toLowerCase() === "to" ? "PASTE" : "MAX"
        }</Text>
         </View>
       
      </View>
    );
  };
  
  export default InputField;
  
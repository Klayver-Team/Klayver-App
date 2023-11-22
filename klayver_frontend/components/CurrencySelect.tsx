import React, { useState } from "react"
import { View, Text, TouchableOpacity,Modal,Image, TextInput } from "react-native"
import {Picker} from "@react-native-picker/picker"

import InputField from "./Input"

interface CurrencyTypes{
    label: string,
    borrowlimit: boolean,
    data: any[],
    setSelectedOption: any,
    selectedOption: any,
    setLoanAmt: any,
    loanAmt: string | number,
}
export const CurrencySelect: React.FC<CurrencyTypes> = ({ label, borrowlimit, data, loanAmt, setLoanAmt,selectedOption, setSelectedOption }) => {
    //const [loanAmt, setLoanAmt] = useState("")
    const [modalVisible, setModalVisible] = useState(false);
 // const [selectedOption, setSelectedOption] = useState<any>("");
   
   const handleInputChange = (inputText: string) => {
    // Ensure that the input only contains numeric characters
    const numericInput = inputText.replace(/[^0-9]/g, '');
    setLoanAmt(numericInput);
  };
    return (
    <View className="mb-5">
      <View className="flex flex-row justify-between">
        <Text className="pb-5 text-lg">{label}</Text>
            </View>
       
            <View className="mb-5">
      <View className="bg-[#fff] p-3 flex flex-row justify-around text-[#5c2684] rounded-[30px]">
        <TextInput
         onChangeText={handleInputChange}
          value={loanAmt.toString()}
          placeholderTextColor={"#828282"}
          placeholder={"Enter amount"}
          keyboardType="numeric"    
          className="text-sm h-8 text-break w-[90%]"
        />
      </View>
            </View>
            

            <View className="bg-[#fff] pb-8 pt-4 flex flex-row justify-between rounded-[30px]">
                <View>
          <Text className="flex text-[black] relative right-3 top-2 left-3 mx-1 font-bold text-xl w-[100px] justify-end ">
                        { loanAmt ? loanAmt : 0} {selectedOption?.title || ""}
            </Text>
          <Text className="flex text-[#828282] relative right-3 top-2 left-3 mx-1 font-semilight text-[15px] justify-end">
          {"($2,040)"}              
                    </Text>     
          </View>          
        
        
     <View className="right-6">
       <View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }} className=" fixed top-2 ">
        {selectedOption?.icon}
          <Text className="text-[black] text-xl font-bold ">{selectedOption?.title || 'Select token'}</Text>
          <Text className="text-[#828282]">▼</Text>
        </View>
      </TouchableOpacity>

      <Modal transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: '#fff', padding: 12, gap: 9, borderRadius: 8, width: 200 }}>
            {data?.map((option) => (
                <TouchableOpacity key={option.id} className="flex flex-row" onPress={() => { setSelectedOption(option); setModalVisible(false); }}>
                   
                       {option.icon}
                    
                <Text style={{ paddingVertical: 8 }}>{option.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
                        </Modal>
                        { borrowlimit &&
                            <Text className="ml-7 text-[#828282] mt-2 font-semilight text-[15px] ">
                                Borrow limit : $5,000
                            </Text>
                        }   
            </View>
                  
                  
                                   
    </View>
      </View>
    </View>
    )
}
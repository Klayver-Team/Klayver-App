import React, { useState } from "react"
import { Pressable, ScrollView,Text, TouchableHighlight, View } from "react-native"
import InputField from "../components/MultipleInput"
import { FieldTexts, FormInputFields } from "../utils/data"

const Form = () => {

   


    const [formState, setFormState] = useState<any>({
         username: "",
         bio: "",
         profession: "",
         wallet: "",
         rate: "",
         portfolio: "",
         talent: "",
     });
    //const [username, setUsername] = useState("")
     const handleInputChange = (fieldName: any, value: any) => {
    setFormState((prevState: any) => ({
      ...prevState,
      [fieldName]: value,
    }));
     };

    return (
        <ScrollView>
            <View className="my-11 mx-4 rounded flex ">
         <Text className="text-2xl font-semibold py-10">
          Fill this form to become a talent on Klayver.
                </Text>
                {
                    FormInputFields?.map((item: FieldTexts) => (
                        <>
                            <InputField
                                key={item.id}
                                placeholder={item.placeholder}
                                label={item.label}
                                enabled={item.enabled}
                                rightIconText={item.rightIconText}
                                value={formState[item.name || ""]}
                                iconText=""
                                onChange={(text: string) => handleInputChange(item.name, text)}
                                 />
                    </>
                    
                    ))
                }
                <TouchableHighlight className="bg-[#F88908] rounded-[30px] p-1 mt-[10px]"
                onPress={() => console.log(formState)}>
        <Text className="text-[#fff] p-3 text-center font-semibold text-[20px]">
          Submit
        </Text>
      </TouchableHighlight>
               
        </View>
        </ScrollView>
    )
}

export default Form
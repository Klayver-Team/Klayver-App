import React, { useState } from "react"
import { View, Text, Button, TouchableOpacityComponent } from "react-native"
import { useRoute } from '@react-navigation/native'
import { Link, router, useLocalSearchParams } from "expo-router"
import UsdtIcon from "../assets/icons/usdt.svg"
import EthIcon from "../assets/icons/eth.svg"
import InputField from "../components/Input"
import { TouchableOpacity } from "react-native-gesture-handler"
import Barcode from "../assets/icons/barcode.svg"
import CopyIcon from "../assets/icons/Frame.svg"
const ReceiveDetails = () => {
    const params: {currency: string, send: string} = useLocalSearchParams();
    const currency: string = params.currency ?? "";
    const [amount, setAmount] = useState("");
    const [address, setAddress] = useState("")
    const send = params.send
    return (
        
        <View className="my-11 mx-7 rounded flex ">

               
                <Text className="text-3xl mt-10 py-10 text-center font-semibold">
                Receive
                <View className="py-9 px-2">
                {
                    currency === "USDT"
                    ?
                    <UsdtIcon height={40}/>
                    :
                    <EthIcon/>
                }
                </View>
                {currency}
                </Text>
            <View className="flex flex-col justify-center">
                <View className="flex m-auto">
                <Barcode/>
                </View>
               
                <TouchableOpacity  className="bg-[#fff] px-3 py-3 mb-3 gap-3 mt-4 flex-row rounded-[20px] flex flex-col">
                <Text className="text-xl text-[#828282] font-semibold">
                    Wallet address
                </Text>
                <View className="flex flex-row mr-3">
                <Text className="text-xl font-[400] w-[90%] mr-3">
                0x5407b52aAcf58cb5CE8638caa26Dc1Ec76cb4b5312
                </Text>
                <CopyIcon/>
                </View>
                </TouchableOpacity>


                <TouchableOpacity  className="bg-[#fff] px-3 py-3 mb-3 gap-3 mt-4 flex-row rounded-[20px] flex flex-col">
                
                <Text className="text-lg">
                • You are about to credit your wallet with
                <Text className="font-bold">
                {` ${currency}`}
                </Text>
                </Text>
                <Text className="text-lg">
                • Send only<Text className="font-bold">
                {` ${currency}`}
                </Text> to this address, sending assets other than <Text className="font-bold">
                {`${currency}`}
                </Text> to this address or to a different network will result in the loss of your deposit
                </Text>
                
               
               
                </TouchableOpacity>
            </View>
      </View> 
    )

}


export default ReceiveDetails
import { useLocalSearchParams } from "expo-router";
import React from "react"
import { View, Text, Button, Pressable } from "react-native"
import { GridTable } from "../components/Grid";


const TransactionDetails = () => {
    const params: {currency: string, address: string, amount: string, icon: any} = useLocalSearchParams();
    const currency = params.currency ?? "";
    const address = params.address
    const amount = +params.amount
    const icon = params.icon
    const fee: number = 0.01
    const charge = fee + currency+ "($0.01)"
    const dataTable = [
        {
            title: "Assets",
            value:  currency,
            id: 1
        },
        {
            title: "From",
            value: "123acg61jzxhiuq0x6shhshhshshhshshshhshshshshjalk;appowoialla",
            id: 2
        },
        {
            title: "To",
            id:3,
            value: address
        }
    ]

    const assetTable = [
        {
            title: "Transaction Fee",
            id: 1,
            value: `0.01 ${currency} ($0.01)`
        },
        {
            title: "Total",
            id: 2,
            value: `$${amount + fee}`
        }
    ]
    return (
        <View className="my-11 mx-7 rounded flex ">
            <View className="flex flex-col">
             <Text className="text-3xl mt-10 font-semibold text-center pt-10">
             {amount} {currency} 
             </Text>
             <Text className="text-sm font-light text-center">= ${amount}</Text> 
             </View>
                <GridTable data = {dataTable}/>

                <GridTable data = {assetTable}/>
                <View className="bg-[#F88908] rounded-[30px] mt-[100px]">
                <Pressable>
                <Text className="text-[#fff] p-3 text-center font-semibold text-[20px]">Send</Text>
                </Pressable>
               
            </View>

           
        </View>
    )
}

export default TransactionDetails
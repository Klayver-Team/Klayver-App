import { Text, View } from "react-native"
import USDTIcon from "../../assets/icons/usdt.svg"
import ETHIcon from "../../assets/icons/eth.svg"
import React from "react"

export const iconDisplayer = (value : string) => {
    if (value.toUpperCase() === "USDT") {
        return (
        <View className="flex flex-row relative top-[-5] ">
                <USDTIcon height={25} />
                <Text className="font-bold top-1.5">{value}</Text>
                   <View className="bg-[#EAEAEA] mx-1 flex flex-row rounded-full px-2 mt-1 ">
                          <Text className="text-[#828282] text-[10px] text-center mt-1 font-semibold">
                            POLYGON
                          </Text>
                        </View>
        </View>
        )
    }
    else if (value.toUpperCase() === "ETH") {
        return (
        <View className="flex flex-row relative top-[-5]">
                <ETHIcon height={25} />
                <Text className="font-bold top-1.5">{value}</Text>
        </View>
        )
    }

}
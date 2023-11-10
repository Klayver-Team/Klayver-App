import { View, Text, Image } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'

const PostCard = ({item}: any) => {
  return (
    <View className="h-[462px] flex-1 mb-[15px] w-[350px] bg-[#f4f4f4] overflow-y-scroll mx-[10px] rounded-[10px] py-[20px] px-[10px]">
    <View className="flex-row items-start space-x-[12px]">
      <Image
        source={{
          uri: "https://images.pexels.com/photos/3938465/pexels-photo-3938465.jpeg?auto=compress&cs=tinysrgb&w=1600",
        }}
        className="w-[40px] h-[40px] object-contain rounded-full"
      />
      <View className="items-start space-y-2">
        <Text className="text-[16px] font-bold text-black">Joseph</Text>
        <Text className="text-[#BDBDBD] font-normal text-[14px]">
          @0x1A0...293C
        </Text>
      </View>
    </View>
    <Text className="mt-[24px] text-[16px] font-normal text-Black">
      I want to share a code snippet I used to save the world from Alien
      invasion and asteroid strike. Enjoy
    </Text>
    <Image
      source={{
        uri: "https://images.pexels.com/photos/3938465/pexels-photo-3938465.jpeg?auto=compress&cs=tinysrgb&w=1600",
      }}
      className="w-full h-[200px] object-cover rounded mt-[15px]"
    />

    {/** reaction component */}
    <View className="flex-row items-center justify-evenly mt-[18px] w-full">
      <View className="flex-row items-center space-x-[6px]">
        <FontAwesome name="heart" size={24} />
        <Text>24 likes</Text>
      </View>
      <View className="flex-row items-center space-x-[6px]">
        <FontAwesome name="comment" size={24} />
        <Text>24 likes</Text>
      </View>
      <View className="flex-row items-center space-x-[6px]">
        <FontAwesome name="share-alt" size={24} />
        <Text>24 likes</Text>
      </View>
      {/* <FontAwesome name="bookmark-o" size={24} /> */}
    </View>
  </View>
  )
}

export default PostCard
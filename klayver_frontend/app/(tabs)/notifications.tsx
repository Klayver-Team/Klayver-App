import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const notifications = () => {
  return (
  <SafeAreaView style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
    <Text className="text-[20px] font-bold text-Black">Notification</Text>
  </SafeAreaView>
  )
}

export default notifications;

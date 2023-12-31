import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, useColorScheme } from "react-native";

import Colors from "../../constants/Colors";
import React from "react";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarHideOnKeyboard: true,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => (
            <Pressable>
              {({ pressed }: any) => (
                <FontAwesome
                  name="info-circle"
                  size={25}
                  // color={Colors[colorScheme ?? "light"].text}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="finance"
        options={{
          tabBarLabel: "Finanace",
          tabBarIcon: ({ color }) => <TabBarIcon name="money" color={color} />,
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          tabBarLabel: "Notification",
          tabBarIcon: ({ color }) => <TabBarIcon name="bell" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Portfolio",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}

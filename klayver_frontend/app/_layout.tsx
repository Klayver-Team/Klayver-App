import "@walletconnect/react-native-compat";
import "@ethersproject/shims";

import {
  createWeb3Modal,
  defaultConfig,
  Web3Modal,
} from "@web3modal/ethers5-react-native";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import React from "react";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { AuthProvider } from "../context/AuthContext";

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = "39caa80ca89c5fce19ea158f652adb08";

// 2. Create config
const metadata = {
  name: "Klayver",
  description:
    "Tokenize Talent, Transform Recruitment: Welcome to Klayver, Where Skills Meet Blockchain",
  url: "https://web3modal.com",
  icons: [
    "https://prd-akindo-private.s3.us-west-1.amazonaws.com/products/icons/JBkPn0a0RsNRoAVk_medium.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAUVKHMQQTDQGNURYM%2F20240329%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20240329T234444Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMSJHMEUCIQDJ6vH4v4VSgfIoTY4W5TLa0eXQ%2B5q7q2POwuXeXYIbxQIgUw%2BXqOqFglFLsLIpjad%2FIsejPX%2F40qG2Wtz%2FnPSeE2Mq9AMI%2Bf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARABGgwzMjA2NjE2NTI1MTgiDI59ehIsSI8DhRxOFSrIA2KUbtYecmHKFb3KzG0ozZbiKMTRlYh45ZkNhrFm767KcBiGro0PmF8kHOj%2BROjh0mUdqMNz6lpGwHHPEOydy30Xe0TAD0kV3CSWF%2Bj6tHidS%2BK%2FJkuYjnmP%2BkepsZ24Jw%2BUS7CGteHp%2BukRyriS6FrRiLqqXLJk5%2F%2BxGgWCVDpIqYLH6dLI3fJvrnBKrp5weitLicOGsfqEfkaTFDudfvFh1jqKSSyyC%2FnNPlUbq444kvIvQwYQRkdyflZJ7CehT3%2BIRKmO6mPVZ%2FGZMpr%2FYY4h3krG62gxGod4oxoa3z0TRctlRbMgCSo3LUmUi6JAfUaga%2FnT3ZoHZADNwqWOxmOOowKXPQStVML%2BZXACLwhDLPhJnP2IT63Gq1tMUSbZhxbCm6z8IkIqiINOwrwBikdfGKDlxm5Mbr4n58YiWDPBl1%2Fjw3byTXl9rw2U6kQMMf6ulCjXHP1zklyn0R0KfcpRYJRgUyS4e5eHA9PzR8W0%2B969%2BLRfr5ItQf6MPS%2FLwfzLqbfqqWl052ps4lX2xhdrqvi514H4Ri6eCWdiSJu82YpAHGtyQ4U6B4OQkdQSoX%2BVFssmzRHzZHpqy2qqjwGQ6ET5%2BJsGcjCEoJ2wBjqlAU8tIKC9jRbapRpxBPA3kFkwcKmpxnmoqALtPvpS4ZPKTXIeqkKm8zRgM%2BZErcSCC3D3yfW1FViwKrhr0JsCS6PnoVDKBWEESrS%2FHEpKZ39AebEfJdNdA2smAWORiPrgk61jmlXzqjhZtUef4YVrB4w1dpkrJaW9P%2Fdo%2FbpjOwbStJdtEc93zVVyLTuO%2FUL3Hl0PSKrQLWBcDzunGm75EJW%2BwqfJUg%3D%3D&X-Amz-Signature=b95b28d000caf9fd5488e343886fcbfa555cb104d6424cbd3ac29ca27734b324&X-Amz-SignedHeaders=host&x-id=GetObject",
  ],
  redirect: {
    native: "YOUR_APP_SCHEME://",
  },
};

const config = defaultConfig({ metadata });

// 3. Define your chains
const mainnet = {
  chainId: 1,
  name: "Ethereum",
  currency: "ETH",
  explorerUrl: "https://etherscan.io",
  rpcUrl: "https://cloudflare-eth.com",
};

const polygon = {
  chainId: 137,
  name: "Polygon",
  currency: "MATIC",
  explorerUrl: "https://polygonscan.com",
  rpcUrl: "https://polygon-rpc.com",
};

const chains = [mainnet, polygon];

// 4. Create modal
createWeb3Modal({
  projectId,
  chains,
  config,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          contentStyle: {
            backgroundColor: "#12141B",
          },
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack>
      <Web3Modal />
    </AuthProvider>
  );
}

import { View, Text, Pressable, Keyboard } from "react-native";
import React, { useState } from "react";
import WorkDetail from "../../../components/WorkForm/WorkDetail";
import { SafeAreaView } from "react-native-safe-area-context";
import OrderSummary from "../../../components/WorkForm/OrderSummary";
import PurcahseToken from "../../../components/WorkForm/PurcahseToken";
import { FontAwesome } from "@expo/vector-icons";
import RangeComponents from "../../../components/RangeComponents";
import { router } from "expo-router";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";

const workForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentStepTitle, setCurrentStepTitle] = useState("Work Details");

  const step = ["Work Details", "Order Summary", "Purchase talent token"];

  const displayStep = () => {
    switch (currentStep) {
      case 0:
        return <WorkDetail />;
      case 1:
        return <OrderSummary />;
      case 2:
        return <PurcahseToken />;
      default:
        break;
    }
  };

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
    setCurrentStepTitle(step[0 + 1]);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView>
        <View className="flex-row items-center space-x-[102px] px-5 mt-[16px]">
          <FontAwesome
            onPress={() =>
              router.canGoBack() ? router.back() : router.push("/(tabs)/(home)")
            }
            name="arrow-left"
            size={24}
          />
          <Text className="text-[20px] font-medium">{currentStepTitle}</Text>
        </View>

        {/** steps display */}
        <RangeComponents
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          step={step}
        />
        <ScrollView showsHorizontalScrollIndicator={false}>
          {displayStep()}
        </ScrollView>

        <Pressable
          onPress={handleNext}
          className="justify-center items-center px-5 py-3.5 w-[80%] mx-auto mt-[86px] rounded-3xl bg-amber-500"
        >
          <Text className="text-white text-base font-medium leading-5 whitespace-nowrap">
            {(currentStep === 0 && "Continue") ||
              (currentStep === 1 && "Buy talent token ") ||
              (currentStep === 2 && "Buy")}
          </Text>
        </Pressable>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default workForm;

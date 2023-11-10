import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import WorkDetail from "../../../components/WorkForm/WorkDetail";
import { SafeAreaView } from "react-native-safe-area-context";
import OrderSummary from "../../../components/WorkForm/OrderSummary";
import PurcahseToken from "../../../components/WorkForm/PurcahseToken";
import { FontAwesome } from "@expo/vector-icons";
import RangeComponents from "../../../components/RangeComponents";

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
    <SafeAreaView>
      <View className="flex-row items-center space-x-[102px] px-5 mt-[16px]">
        <FontAwesome name="arrow-left" size={24} />
        <Text className="text-[20px] font-medium">{currentStepTitle}</Text>
      </View>

      {/** steps display */}
      <RangeComponents
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />

      {displayStep()}

      <Pressable onPress={handleNext}>
        <Text>Contnue</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default workForm;

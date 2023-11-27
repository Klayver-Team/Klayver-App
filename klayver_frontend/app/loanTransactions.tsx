import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View, Text, TouchableHighlight } from "react-native";
import { GridTable } from "../components/Grid";
import { iconDisplayer } from "../components/IconDisplay/iconDisplay";
const LoanTransactions = () => {
  const params: {
    loanToken: string;
    collateralToken: string;
    selectedDuration: string;
    collateralAmt: string;
  } = useLocalSearchParams();
  const loanToken = params.loanToken;
  const collateralToken = params?.collateralToken;
  const days = params?.selectedDuration;
  const amount = params?.collateralAmt;
  const dailyRate = 0.01;
  const interest = +days * +dailyRate;

  const gasFee = 2;
  const sumTotal = +amount + +interest + +gasFee;
  const dataTable = [
    {
      title: "Asset to borrow",
      currency: iconDisplayer(loanToken),
      value: "",
      id: 1,
    },
    {
      title: "Collateral",
      value: "",
      currency: iconDisplayer(collateralToken),
      id: 2,
    },
  ];

  const dataTableTwo = [
    {
      title: "Base collateral",
      currency: <Text className="font-bold">${amount} </Text>,
      value: "",
      id: 0,
    },
    {
      title: "Total interest",
      currency: <Text className="font-bold">${interest}</Text>,
      value: "",
      id: 1,
    },
    {
      title: "Daily interest rate",
      value: "",
      currency: <Text className="font-bold">${dailyRate}</Text>,
      id: 2,
    },
    {
      title: "Transaction fee",
      value: "",
      currency: <Text className="font-bold">${gasFee}</Text>,
      id: 3,
    },
    {
      title: "Total",
      value: "",
      currency: <Text className="font-bold">${sumTotal}</Text>,
      id: 4,
    },
  ];
  return (
    <View className="my-11 mx-7 rounded flex ">
      <View className="flex flex-col">
        <Text className="text-3xl mt-10 font-semibold text-center pt-10">
          ${sumTotal}
        </Text>
        <Text className="text-sm font-light text-center">= ${sumTotal}</Text>
      </View>
      <GridTable data={dataTable} />
      <GridTable data={dataTableTwo} />

      <TouchableHighlight className="bg-[#F88908] rounded-[30px] p-1 mt-[10px]">
        <Text className="text-[#fff] p-3 text-center font-semibold text-[20px]">
          Borrow
        </Text>
      </TouchableHighlight>
    </View>
  );
};

export default LoanTransactions;

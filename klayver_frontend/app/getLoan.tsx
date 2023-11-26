import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
import InputField from "../components/Input";
import TextAreaField from "../components/TextArea";
import InfoIcon from "../assets/icons/info.svg";
import USDTIcon from "../assets/icons/usdt.svg";
import ETHIcon from "../assets/icons/eth.svg";
import { CurrencySelect } from "../components/CurrencySelect";
import { Link } from "expo-router";
const LoanPage = () => {
  const [loan, setLoan] = useState("");
  const [address, setAddress] = useState("");
  const [selectedDuration, setSelectedDuration] = useState<number>(0);
  const [selectedState, setSelectedState] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<any>(null);

  const [collateral, setCollateral] = useState<any>(null);
  const [loanAmt, setLoanAmt] = useState<number | string>("");
  const [collateralAmt, setCollateralAmt] = useState<number | string>("");
  const loanToken = selectedOption?.title;
  const collateralToken = collateral?.title;
  const durationDays = [
    { title: "7 days", id: 1, value: 7 },
    { title: "14 days", id: 2, value: 14 },
    { title: "35 days", id: 3, value: 35 },
    { title: "100 days", id: 4, value: 100 },
    { title: "150 days", id: 5, value: 150 },
    { title: "200 days", id: 6, value: 200 },
  ];
  const data = [
    {
      title: "USDT",
      id: 1,
      icon: <USDTIcon height={30} />,
    },
    {
      title: "ETH",
      id: 2,
      icon: <ETHIcon height={30} />,
    },
  ];
  let value = "80%";

  return (
    <ScrollView>
      <View className="my-11 mx-7">
        <Text className="text-2xl font-semibold text-center py-10">
          Get a loan
        </Text>
        <CurrencySelect
          label={"I want to borrow"}
          borrowlimit={false}
          data={data}
          loanAmt={loanAmt}
          setLoanAmt={setLoanAmt}
          setSelectedOption={setSelectedOption}
          selectedOption={selectedOption}
        />
        <CurrencySelect
          label={"Select Collateral"}
          borrowlimit={false}
          data={data}
          setSelectedOption={setCollateral}
          loanAmt={collateralAmt}
          setLoanAmt={setCollateralAmt}
          selectedOption={collateral}
        />

        <TouchableOpacity className="flex flex-row bg-[#FAFAFA] justify-center rounded-[40px] border border-solid border-[#E0E0E0] py-3 mb-5 w-[200px]">
          <View className="mt-1">
            <InfoIcon />
          </View>
          <Text className="text-[#828282] font-bold text-lg">
            {" "}
            Loan-To-Value {value}
          </Text>
        </TouchableOpacity>

        <TextAreaField
          label={"What is the loan for?"}
          value={loan}
          placeholder="Enter the description of the loan"
          setValue={setLoan}
          iconText=""
        />
        {/* <View className="py-5"> */}
        <Text className="text-lg pb-4"> Duration of loan</Text>
        <View className="bg-[#fff] rounded-[20px] justify-center p-4 mb-5">
          <View className="flex flex-row justify-center flex-wrap gap-3">
            {durationDays.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={{
                  backgroundColor:
                    selectedState === item.id ? "#f88908" : "#FBFBFB",
                  borderColor: selectedState === item.id ? "#fff" : "#e0e0e0",
                  borderWidth: 1, // Set the border width
                  borderStyle: "solid",
                }}
                className="rounded-[20px] p-3 w-[90px]"
                onPress={() => {
                  setSelectedDuration(item.value);
                  setSelectedState(item.id);
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: selectedState === item.id ? "#fff" : "#828282",
                    fontWeight: "700",
                  }}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
            {/* </View> */}
          </View>
        </View>
        <InputField
          label={"Wallet address of guarantor"}
          value={address}
          placeholder="Enter address"
          setValue={setAddress}
          rightIconText=""
          iconText="PASTE"
        />

        <Pressable className="bg-[#F88908] rounded-[30px] p-3 mt-[10px]">
          <Link
            href={{
              pathname: "/loanTransactions",
              params: {
                collateralAmt,
                loanAmt,
                loanToken,
                collateralToken,
                selectedDuration,
              },
            }}
          >
            <Text className="text-[#fff] p-3 text-center font-semibold text-[20px]">
              Proceed
            </Text>
          </Link>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default LoanPage;

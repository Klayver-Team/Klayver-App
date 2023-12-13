import React, { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import InputField from "../components/MultipleInput";
import { FieldTexts, FormInputFields } from "../utils/data";
import { useKlayProfile } from "../utils/KlayverProfile";
import { useAuth } from "../context/AuthContext";
import { ethers } from "ethers";

const Form = () => {
  const { session } = useAuth();
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [profession, setProfession] = useState("");
  const [rate, setRate] = useState("");
  const [skills, setSkills] = useState<any>("");

  const { createProfile,  isLoading, } =
    useKlayProfile();

  const handleSubmit = async () => {
    createProfile(username, ethers.utils.parseEther(rate), bio, profession, skills);
  };

  return (
    <ScrollView>
      <View className="my-11 mx-4 rounded flex ">
        <Text className="text-2xl font-semibold py-10">
          Fill this form to become a address on Klayver.
        </Text>
        <InputField
          placeholder="Vitalik Buterin"
          label="Username"
          iconText=""
          value={username}
          onChange={(text: any) => setUsername(text)}
        />
        <InputField
          placeholder="a void in space"
          label="Bio"
          iconText=""
          value={bio}
          onChange={(text: any) => setBio(text)}
        />
        <InputField
          placeholder="Blockchain engineer"
          label="Profession"
          iconText=""
          value={profession}
          onChange={(text: any) => setProfession(text)}
        />
        <InputField
          placeholder="10"
          label="Hourly rate"
          iconText=""
          // currency="dollars"
          value={rate}
          onChange={(text: any) => setRate(text)}
        />
        <InputField
          placeholder="Frontend"
          label="Skills"
          iconText=""
          // currency="dollars"
          value={skills}
          onChange={(text: any) => setSkills(text)}
        />
        <TouchableHighlight
          className="bg-[#F88908] rounded-[30px] p-1 mt-[10px]"
          onPress={handleSubmit}
        >
          <Text className="text-[#fff] p-3 text-center font-semibold text-[20px]">
            {isLoading ? isLoading : "Submit"}
          </Text>
        </TouchableHighlight>
      </View>
    </ScrollView>
  );
};

export default Form;

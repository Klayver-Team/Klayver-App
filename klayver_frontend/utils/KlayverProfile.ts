import { useState } from "react";
import {
  klayverProfile,
  klayverProfileABI,
  connectWithContract,
} from "../constants/contractVariable";
import { useAuth } from "../context/AuthContext";

interface klayverProfile {
  _name: string;
  _profilepic: string;
  _tokenaddress: string;
  monthlyCharge: number;
  _bio: string;
  profession: string;
  skills: string;
}

export const useKlayProfile = () => {
  const [allProfile, setAllProfile] = useState([]);
  const { session } = useAuth();
  const createProfile = async (
    _name: string,
    monthlyCharge: string,
    _bio: string,
    profession: string,
    skills: string
  ) => {
    try {
      const contract = await connectWithContract(
        klayverProfile,
        klayverProfileABI
      );
      const tx = await contract?.createAProfile(
        _name,
        monthlyCharge,
        _bio,
        profession,
        skills
      );
      const receipt = tx.wait();
      console.log(receipt.transactionhash);
    } catch (error) {
      console.log(error);
    }
  };

  const retriveData = async () => {
    try {
      const contract = await connectWithContract(
        klayverProfile,
        klayverProfileABI
      );
      const tx = await contract?.retrieveAllProfile();
      console.log(tx);
      setAllProfile(tx);
      return tx;
    } catch (error) {
      console.log(error);
    }
  };

  const filterForUser = async () => {
    try {
      const user = await retriveData();
      const filteredUser = user.filter((item: any) => item.owner === session);
      return filteredUser;
    } catch (error) {
      console.log("error", error);
    }
  };

  return {
    createProfile,
    retriveData,
    filterForUser,
    allProfile
  };
};

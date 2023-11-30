import { useState } from "react";
import {
  klayverProfile,
  klayverProfileABI,
  connectWithContract,
  token,
  tokenAbi,
  content,
  contentABI,
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
  const [isLoading, setIsLoading] = useState("");
  const [tokens, setTokens] = useState("");

  const { session } = useAuth();

  const createAToken = async () => {
    try {
      const contract = await connectWithContract(token, tokenAbi);
      const tx = await contract?.createToken();
      const receipt = tx.wait();
      console.log(receipt.hash);
      return receipt.hash;
    } catch (error) {
      console.log(error);
    }
  };

  const retriveTokens = async () => {
    try {
      const contract = await connectWithContract(token, tokenAbi);
      const tx = await contract?.retrieveAllToken();
      console.log(tx);
      return tx;
    } catch (error) {
      console.log(error);
    }
  };

  const getToken = async () => {
    try {
      const allTokens = await retriveTokens();
      const filteredTokens = allTokens.filter(
        (token: any) => token.owner === session
      );
      const tokenAddresses = filteredTokens.map(
        (token: any) => token.tokenAddress
      );
      console.log("tokens", tokenAddresses[0]);
      setTokens(tokenAddresses[0]);
      return tokenAddresses[0];
    } catch (error) {}
  };

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
      setIsLoading("Creating profile...");
      const tx = await contract?.createAProfile(
        _name,
        monthlyCharge,
        _bio,
        profession,
        skills
      );
      const receipt = tx.wait();
      console.log(receipt.hash);
      setIsLoading("Profile created");
      if (receipt) {
        setIsLoading("Talent tokens is being created...");
        const txReceipt = await createAToken();
        console.log(txReceipt);
        setIsLoading("Successfull created token...");
      } else {
        setIsLoading("");
      }
    } catch (error) {
      console.log(error);
      setIsLoading("");
    }
  };

  const retriveData = async () => {
    try {
      const contract = await connectWithContract(
        klayverProfile,
        klayverProfileABI
      );
      const tx = await contract?.retrieveAllProfile();
      // console.log(tx);
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

  const createAKlay = async (_newImage: any, _newPost: any) => {
    try {
      const contract = await connectWithContract(content, contentABI);
      const tx = await contract?.createAKlay(_newImage, _newPost);
      const receipt = tx.wait();
      console.log(receipt.hash);
    } catch (error) {
      console.log(error);
    }
  };

  const retrieveKlays = async () => {
    try {
      const contract = await connectWithContract(
        klayverProfile,
        klayverProfileABI
      );
      const tx = await contract?.retrieveKlays();
      const receipt = tx.wait();
      console.log(receipt.transactionhash);
    } catch (error) {
      console.log(error);
    }
  };

  const mintPost = async (id: number) => {
    try {
      const contract = await connectWithContract(
        klayverProfile,
        klayverProfileABI
      );
      const tx = await contract?.mintPost(id);
      const receipt = tx.wait();
      console.log(receipt.transactionhash);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    createProfile,
    retriveData,
    filterForUser,
    allProfile,
    createAToken,
    isLoading,
    retriveTokens,
    getToken,
    tokens,
    createAKlay,
    retrieveKlays,
    mintPost
  };
};

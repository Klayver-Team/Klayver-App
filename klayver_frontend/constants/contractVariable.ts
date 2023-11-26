import { getAccountPhrase } from "@rly-network/mobile-sdk";
import klayAbi from "./Klayver.json";
import klayverProfileAbi from "./KlayverProfile.json";
import KlayverTokenAbi from "./Token.json";
import { ethers } from "ethers";

const klayver = "0x4b7Ffa2576ea1F8c8761ccFCCB62d1c86672a3f6";
const klayverProfile = "0xbd489ae89398AF3dCaC60EF7Ca178CcA18c17E80";
const token = "0x3eAEaC76A68d50977e6aF00E1D1110A8B61531Aa";

const KlayverABI = klayAbi.abi;
const klayverProfileABI = klayverProfileAbi.abi;
const KlayverTokenABI = KlayverTokenAbi.abi;

export {
  KlayverABI,
  KlayverTokenABI,
  klayverProfileABI,
  klayver,
  klayverProfile,
  token,
};

export const connectWithContract = async (
  contractAddress: string,
  contractAbi: any
) => {
  try {
    const mnemonic = await getAccountPhrase();
    if (!mnemonic) {
      throw new Error("Failed to get account phrase");
    }
    const privateKey =
      ethers.Wallet.fromMnemonic(mnemonic)._signingKey().privateKey;
    const provider = new ethers.providers.JsonRpcProvider(
      "https://public-en-baobab.klaytn.net"
    );

    const wallet = new ethers.Wallet(privateKey, provider);

    const myContract = new ethers.Contract(
      contractAddress,
      contractAbi,
      wallet
    );
    return myContract;
  } catch (error) {
    console.log(`error getting contract initiated ${error}`);
  }
};

import { getAccountPhrase } from "@rly-network/mobile-sdk";
import klayAbi from "./Klayver.json";
import klayverProfileAbi from "./KlayverProfile.json";
import KlayverTokenAbi from "./Token.json";
import { ethers } from "ethers";

const klayver = "0x4b7Ffa2576ea1F8c8761ccFCCB62d1c86672a3f6";
const klayverProfile = "0x815B5034b894E855E29B5286696b5ce7Ed643bbc";
const token = "0xf9772132CA9293105051E0d320553A5937069d3f";

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

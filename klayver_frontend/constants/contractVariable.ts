import { getAccountPhrase } from "@rly-network/mobile-sdk";
import klayAbi from "./Klayver.json";
import klayverProfileAbi from "./KlayverProfile.json";
import KlayverTokenAbi from "./Token.json";
import { ethers } from "ethers";
import tokenABI from "./Token.json";
import contentAbi from "./KlayContent.json";

const klayver = "0x4b7Ffa2576ea1F8c8761ccFCCB62d1c86672a3f6";
const klayverProfile = "0x909Cad763d28c2a8CbbFFCFdC5d282c3dA583182";
const token = "0xD916F8420d4CCeFF69BEFf392533005cB191DF94";
const content = "0xfF3D926Dc13Aebfc7e527C46776123b5e7c57893";

const KlayverABI = klayAbi.abi;
const klayverProfileABI = klayverProfileAbi.abi;
const KlayverTokenABI = KlayverTokenAbi.abi;
const tokenAbi = tokenABI.abi;
const contentABI = contentAbi.abi;

export {
  KlayverABI,
  KlayverTokenABI,
  klayverProfileABI,
  klayver,
  klayverProfile,
  token,
  tokenAbi,
  content,
  contentABI
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

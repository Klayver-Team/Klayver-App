import {
  klayverProfile,
  klayverProfileABI,
  connectWithContract,
} from "../constants/contractVariable";

interface klayverProfile {
  _name: string;
  _profilepic: string;
  _tokenaddress: string;
  monthlyCharge: number;
  _bio: string;
  profession: string;
  skills: string;
}

export const createProfile = async ({
  _name,
  _profilepic,
  _tokenaddress,
  monthlyCharge,
  _bio,
  profession,
  skills,
}: klayverProfile) => {
  try {
    const contract = await connectWithContract(
      klayverProfile,
      klayverProfileABI
    );
    const tx = await contract?.createAProfile(
      _name,
      _profilepic,
      _tokenaddress,
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



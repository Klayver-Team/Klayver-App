import { EphemeralKeyPair } from '@aptos-labs/ts-sdk';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useEphemeralKeyPair() {
  const ephemeralKeyPair = EphemeralKeyPair.generate();
  storeEphemeralKeyPair(ephemeralKeyPair);

  return ephemeralKeyPair;
}

export type StoredEphemeralKeyPairs = { [nonce: string]: EphemeralKeyPair };

export const storeEphemeralKeyPair = async (
  ephemeralKeyPair: EphemeralKeyPair,
): Promise<void> => {
  const accounts = await getLocalEphemeralKeyPairs();

  accounts[ephemeralKeyPair.nonce] = ephemeralKeyPair;
  await AsyncStorage.setItem(
    "ephemeral-key-pairs",
    JSON.stringify(accounts),
  );
};

export const getLocalEphemeralKeyPairs = async (): Promise<StoredEphemeralKeyPairs> => {
  const rawEphemeralKeyPairs = await AsyncStorage.getItem("ephemeral-key-pairs");
  try {
    return rawEphemeralKeyPairs
     ? JSON.parse(rawEphemeralKeyPairs)
      : {};
  } catch (error) {
    console.warn(
      "Failed to decode ephemeral key pairs from AsyncStorage",
      error,
    );
    return {};
  }
};

const EphemeralKeyPairEncoding = {
  decode: (e: any) => EphemeralKeyPair.fromBytes(e.data),
  encode: (e: EphemeralKeyPair) => ({ __type: 'EphemeralKeyPair', data: e.bcsToBytes() }),
};

export const encodeEphemeralKeyPairs = (
  keyPairs: StoredEphemeralKeyPairs,
): string =>
  JSON.stringify(keyPairs, (_, e) => {
    if (typeof e === "bigint") return { __type: "bigint", value: e.toString() };
    if (e instanceof Uint8Array)
      return { __type: "Uint8Array", value: Array.from(e) };
    if (e instanceof EphemeralKeyPair)
      return EphemeralKeyPairEncoding.encode(e);
    return e;
  });

export const decodeEphemeralKeyPairs = (
  encodedEphemeralKeyPairs: string,
): StoredEphemeralKeyPairs =>
  JSON.parse(encodedEphemeralKeyPairs, (_, e) => {
    if (e && e.__type === "bigint") return BigInt(e.value);
    if (e && e.__type === "Uint8Array") return new Uint8Array(e.value);
    if (e && e.__type === "EphemeralKeyPair")
      return EphemeralKeyPairEncoding.decode(e);
    return e;
  });
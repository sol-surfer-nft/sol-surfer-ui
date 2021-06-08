import { PublicKey } from "@solana/web3.js";
import { useConnectionConfig } from "../context/connection";
import { getTokenName } from "../utils/dapp-scaffold-utils/utils";

export function useTokenName(mintAddress?: string | PublicKey) {
  const { tokenMap } = useConnectionConfig();
  const address =
    typeof mintAddress === "string" ? mintAddress : mintAddress?.toBase58();
  return getTokenName(tokenMap, address);
}

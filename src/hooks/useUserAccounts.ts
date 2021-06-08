import { TokenAccount } from "../models";
import { useAccountsContext } from "../context/accounts";

export function useUserAccounts() {
  const context = useAccountsContext();
  return {
    userAccounts: context?.userAccounts as TokenAccount[],
  };
}

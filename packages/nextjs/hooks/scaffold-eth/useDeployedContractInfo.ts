import { useTargetNetwork } from "./useTargetNetwork";
import { useQuery } from "@tanstack/react-query";
import { usePublicClient } from "wagmi";
import { Contract, ContractName, contracts } from "~~/utils/scaffold-eth/contract";

/**
 * Gets the matching contract info for the provided contract name from the contracts present in deployedContracts.ts
 * and externalContracts.ts corresponding to targetNetworks configured in scaffold.config.ts
 */
export const useDeployedContractInfo = <TContractName extends ContractName>(contractName: TContractName) => {
  const { targetNetwork } = useTargetNetwork();
  const deployedContract = contracts?.[targetNetwork.id]?.[contractName as ContractName] as Contract<TContractName>;
  const publicClient = usePublicClient({ chainId: targetNetwork.id });
  const code = useQuery({
    queryKey: ["deployed-contract", contractName],
    queryFn: async () =>
      publicClient?.getBytecode({
        address: deployedContract.address,
      }),
    enabled: !!publicClient,
  });

  return {
    data: code.isSuccess ? deployedContract : undefined,
    isLoading: code.isLoading,
  };
};

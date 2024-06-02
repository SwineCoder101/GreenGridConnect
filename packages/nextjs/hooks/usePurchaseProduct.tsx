import { useScaffoldWriteContract } from "./scaffold-eth";
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";
import { useMutation } from "@tanstack/react-query";
import confetti from "canvas-confetti";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";
import { Product } from "~~/lib/random";
import { useGlobalState } from "~~/services/store/store";

const usePurchaseProduct = ({ onSuccess }: { onSuccess?: () => void }) => {
  const { balance } = useGlobalState();
  const { writeContractAsync } = useScaffoldWriteContract("EURe");
  const addRecentTx = useAddRecentTransaction();
  const { address: accountAddress } = useAccount();
  const tx = useMutation({
    mutationFn: async ({ product, address, amount }: { product: Product; address: string; amount: bigint }) => {
      if (!accountAddress) throw new Error("You need to first connect your wallet");

      if (balance && balance < product.price) throw new Error(`Insufficient EURe, ${product.price} required`);

      console.log(`purchaseProduct:writeContractAsync`);
      const hash = await writeContractAsync({
        functionName: "transfer",
        args: [address, amount],
      });
      if (!hash) throw new Error("Failed to create transaction");
      console.log(`purchaseProduct:writeContractAsync:${hash}`);

      return { hash, product };
    },
    onSuccess: res => {
      if (!res) return;
      const { hash, product } = res;
      addRecentTx({ hash, description: `Purchased ${product.name}` });
      onSuccess?.();
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return tx;
};

export default usePurchaseProduct;

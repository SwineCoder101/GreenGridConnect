/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { parseEther } from "viem";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { Button } from "~~/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "~~/components/ui/dialog";
import usePurchaseProduct from "~~/hooks/usePurchaseProduct";
import { Product } from "~~/lib/random";

const TREASURY_WALLET_ADDRESS = "0x108ecc7cd00d1A7B7E820AEa5834fDc5D5c26aC7";

const ProductModal = ({ product }: { product: Product }) => {
  const [open, setOpen] = useState(false);
  const purchaseProduct = usePurchaseProduct({});

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <button className="w-[calc((100vw-4rem-0.5rem*7)/8)] rounded-xl p-2 border-2 border-neutral-800 max-w-80 hover:border-neutral-600 hover:-translate-y-2 duration-150 ease-in-out">
          <img src={product.image} alt={product.name} className="rounded-lg w-full h-60 object-cover" />
          <div className="mt-2 flex space-x-1 items-center text-xs font-medium">
            <div className="text-neutral-400">{product.provider}</div>
            {product.verified ? <CheckBadgeIcon className="w-3.5 h-3.5 text-amber-400 mt-0.5" /> : null}
          </div>
          <div className="mt-1 w-full text-left font-semibold text-sm">{product.name}</div>
          <div className="mt-2 flex space-x-6 bg-neutral-800 p-2 rounded-lg">
            <div className="flex flex-col justify-start">
              <div className="text-left w-full text-sm font-semibold text-muted-foreground">Price</div>
              <div className="text-left flex items-center w-full mt-1.5 text-xs font-semibold">
                <img src={product.currencyImg} alt={product.currency} className="w-3 h-3 mr-1" /> {product.price}{" "}
                {product.currency}
              </div>
            </div>
            <div className="flex flex-col justify-start">
              <div className="text-left w-full text-sm font-semibold text-muted-foreground">In use</div>
              <div className="text-left w-full mt-1.5 text-xs font-semibold">{product.inUse ?? 0}</div>
            </div>
          </div>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>{!purchaseProduct.data && <DialogTitle>{product.name}</DialogTitle>}</DialogHeader>
        {purchaseProduct.data ? (
          <div className="flex flex-col justify-center items-center pb-6">
            <CheckCircle className="my-6 w-12 h-12 text-green-500" />
            <span className="text-center font-semibold">
              Purchased {product.name} for {product.price} {product.currency}
            </span>
            <p className="text-center text-sm text-muted-foreground">
              You can view the transaction receipt{" "}
              <a
                href={`https://volta-explorer.energyweb.org/tx/${purchaseProduct.data.hash}`}
                target="_blank"
                className="hover:underline"
              >
                here
              </a>
            </p>
          </div>
        ) : (
          "Are you sure you want to purchase this?"
        )}
        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)} disabled={purchaseProduct.isPending}>
            {purchaseProduct.isSuccess ? "Close" : "Cancel"}
          </Button>
          {!purchaseProduct.isSuccess && (
            <Button
              onClick={() =>
                purchaseProduct.mutate({
                  product,
                  address: TREASURY_WALLET_ADDRESS,
                  amount: parseEther(`${product.price}`),
                })
              }
              disabled={purchaseProduct.isPending}
            >
              Confirm
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;

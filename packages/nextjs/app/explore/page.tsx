"use client";

// import Link from "next/link";
import Marketplace from "./components/marketplace";
import type { NextPage } from "next";
import { useTheme } from "next-themes";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~~/components/ui/tabs";

// import { useAccount } from "wagmi";
// import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
// import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  // const { address: connectedAddress } = useAccount();
  const { resolvedTheme } = useTheme();
  console.log(resolvedTheme);

  return (
    <>
      {/* <div className="flex justify-center items-center"></div> */}
      <Tabs defaultValue="marketplace">
        <TabsList className="bg-transparent p-0 space-x-4">
          <TabsTrigger
            value="marketplace"
            className="px-0 text-2xl font-bold text-neutral-600 data-[state=active]:text-neutral-50 data-[state=active]:bg-transparent"
          >
            Marketplace
          </TabsTrigger>
          <TabsTrigger
            value="maps"
            className="px-0 text-2xl font-bold text-neutral-600 data-[state=active]:text-neutral-50 data-[state=active]:bg-transparent"
          >
            Maps
          </TabsTrigger>
        </TabsList>
        <TabsContent value="marketplace">
          <Marketplace />
        </TabsContent>
        <TabsContent value="maps">Maps..</TabsContent>
      </Tabs>
    </>
  );
};

export default Home;

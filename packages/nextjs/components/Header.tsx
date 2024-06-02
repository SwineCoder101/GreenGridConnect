"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { formatEther } from "viem";
import { useAccount } from "wagmi";
import { Badge } from "~~/components/ui/badge";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { useGlobalState } from "~~/services/store/store";

type HeaderMenuLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

export const menuLinks: HeaderMenuLink[] = [
  {
    label: "Dashboard",
    href: "/",
  },
  {
    label: "Explore",
    href: "/explore",
  },
];

export const HeaderMenuLinks = () => {
  const pathname = usePathname();

  return (
    <>
      {menuLinks.map(({ label, href, icon }) => {
        const isActive = pathname === href;
        return (
          <li key={href}>
            <Link href={href} passHref className={`${isActive ? "text-neutral-400" : "text-neutral-600"}`}>
              {icon}
              <span className="font-bold">{label}</span>
            </Link>
          </li>
        );
      })}
    </>
  );
};

/**
 * Site header
 */
export const Header = () => {
  const path = usePathname();
  const { address } = useAccount();
  const { setBalance } = useGlobalState();
  const balance = useScaffoldReadContract({ contractName: "EURe", functionName: "balanceOf", args: [address] });

  useEffect(() => {
    if (balance.data) setBalance(Number(formatEther(balance.data)));
  }, [balance.data]);

  return (
    <div className="flex sticky lg:static top-0 bg-transparent min-h-0 flex-shrink-0 justify-between z-20 py-6">
      <div className="flex items-center space-x-4">
        <Link href="/" passHref className="flex items-center gap-2 shrink-0">
          <div className="flex relative w-10 h-10">
            <Image alt="GGC logo" className="cursor-pointer rounded-lg" fill src="/logo.svg" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold leading-tight">GreenGridConnect</span>
            <span className="text-xs text-neutral-400">Make the Earth a better place</span>
          </div>
        </Link>
        <div className="relative rounded-xl px-3 py-1.5 bg-neutral-800 w-[400px] h-10 focus-within:ring-2 focus-within:ring-neutral-600 hover:ring-2 hover:ring-neutral-600 duration-150 ease-in-out">
          <input
            type="text"
            className="w-full bg-transparent outline-none text-sm placeholder-neutral-600"
            placeholder="Search for providers or users"
          />
          <Badge variant={"secondary"} className="absolute bg-neutral-700 -top-2 -right-2">
            {path === "/" ? "Producer" : "Consumer"}
          </Badge>
        </div>
        <ul className="flex px-1 gap-4">
          <HeaderMenuLinks />
        </ul>
      </div>
      <div className="flex items-center space-x-4">
        {balance.data && (
          <div className="px-3 py-2 rounded-xl bg-[#1a1b1f] font-semibold flex items-center">
            <img src={"/eure.png"} className="w-4 h-4 mr-2" />
            {Number(formatEther(balance.data)).toFixed(2)} EURe
          </div>
        )}
        <ConnectButton />
      </div>
    </div>
  );
};

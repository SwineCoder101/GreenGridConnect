"use client";

import { useEffect, useState } from "react";
import { RainbowKitProvider, darkTheme, lightTheme } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTheme } from "next-themes";
import { Toaster } from "react-hot-toast";
import { WagmiProvider } from "wagmi";
import { BlockieAvatar } from "~~/components/BlockieAvatar";
// import { Footer } from "~~/components/Footer";
import { Header } from "~~/components/Header";
import { ProgressBar } from "~~/components/ProgressBar";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";

const App = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-neutral-900 px-8 text-black dark:text-white pb-24">
        <Header />
        <main className="relative flex flex-col flex-1">{children}</main>
        {/* <Footer /> */}
      </div>
      <Toaster />
    </>
  );
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ProgressBar />
        <RainbowKitProvider
          avatar={BlockieAvatar}
          theme={
            mounted
              ? isDarkMode
                ? darkTheme({ accentColor: "white", accentColorForeground: "black" })
                : lightTheme()
              : lightTheme()
          }
        >
          <App>{children}</App>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

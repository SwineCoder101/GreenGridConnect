import "@rainbow-me/rainbowkit/styles.css";
import { Providers } from "~~/components/Providers";
import { ThemeProvider } from "~~/components/ThemeProvider";
import "~~/styles/globals.css";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "GreenGridConnect",
  description: "Make the Earth a better place.",
});

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default Layout;

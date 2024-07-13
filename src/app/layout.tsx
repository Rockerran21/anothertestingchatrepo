import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

import "./globals.css";

import MyMsalProvider from "@/lib/msal/MyMsalProvider";
import { Providers } from "@/components/utility/providers";
import { GlobalState } from "@/components/utility/global-state";

const inter = Inter({ subsets: ["latin"] });

const APP_DEFAULT_TITLE = "RH GPT";

export const metadata: Metadata = {
  title: APP_DEFAULT_TITLE,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning={true}>
        <MyMsalProvider>
          <main>
            <Providers attribute="class" defaultTheme="system" enableSystem>
              <Toaster richColors closeButton position="bottom-center" />
              <GlobalState>{children}</GlobalState>
            </Providers>
          </main>
        </MyMsalProvider>
      </body>
    </html>
  );
}

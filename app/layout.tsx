import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ToastProviderInternal } from "@/components/ui/use-toast";
import { ThemeScript } from "@/components/theme-script";
import { AuthProvider } from "@/components/providers/auth-provider";
import PatternBg from "@/public/pattern-bg.png";
import Image from "next/image";
import { Funnel_Display } from "next/font/google";

const funnelDisplay = Funnel_Display({
   subsets: ["latin"],
   weight: ["300", "400", "500", "600", "700", "800"],
   display: "swap",
   variable: "--font-funnel",
});

export const metadata: Metadata = {
   title: "Disruptor",
   description: "- Unlock Your Business Potential with AI Insights",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en" className={funnelDisplay.variable}>
         <body className="antialiased font-sans relative">
            <Image
               src={PatternBg}
               alt=""
               fill
               priority
               aria-hidden
               className="inset-0 object-cover opacity-70 pointer-events-none z-10 !fixed"
            />
            <ThemeScript />
            <ToastProviderInternal>
               <AuthProvider>
                  {children}
                  <Toaster />
               </AuthProvider>
            </ToastProviderInternal>
         </body>
      </html>
   );
}

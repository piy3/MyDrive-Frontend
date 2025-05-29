import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider"
import { Toaster } from "react-hot-toast";


export const metadata = {
  title: "MyDrive",
  description: "No worries of storage",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
             <div><Toaster /></div>
            {children}
          </ThemeProvider>
        </body>
    </html>
  );
}

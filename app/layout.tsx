import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SideNav } from "./components/ui/SideNav"
import { ThemeProvider } from "./components/theme-provider"
import { Toaster } from "./components/ui/toaster"
import { NavContextProvider } from "./context/NavContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Crypto Stats",
  description: "Live Crypto Metrics",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
        <body className={inter.className}>
          <NavContextProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="light"
                enableSystem
                disableTransitionOnChange
              >
                <div className='flex'>
                  <SideNav />
                  {children}
                </div>
                <Toaster />
              </ThemeProvider>
            </NavContextProvider>
          </body>
    </html>
  )
}

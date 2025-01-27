import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { AnimationWrapper } from "@/components/animation-wrapper"
import { ToastProvider } from "@/components/ui/toast"
import { Toaster } from "@/components/ui/toaster"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DocaPrise",
  description: "A responsive navbar with theme toggle and user menu",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ToastProvider>
            <Navbar />
            <AnimationWrapper>
              <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-16 relative z-10">
                {children}
              </main>
            </AnimationWrapper>
            <Footer />
            <Toaster />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'
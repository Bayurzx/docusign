"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "./theme-toggle"
import { UserMenu } from "./user-menu"
import { MobileMenu } from "./mobile-menu"
import { cn } from "@/lib/utils"
import { FileText } from 'lucide-react'

const navItems = [
  { href: "/", label: "Home" },
  { href: "/docs", label: "Docs" },
  { href: "/features", label: "Features" },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center text-2xl font-bold text-primary">
                <FileText className="h-8 w-8 mr-2" />
                DocaPrise
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "inline-flex items-center px-1 pt-1 text-sm font-medium",
                  pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <UserMenu />
            <MobileMenu />
          </div>
        </div>
      </div>
    </nav>
  )
}


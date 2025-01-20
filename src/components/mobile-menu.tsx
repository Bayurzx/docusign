"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from 'lucide-react'

const navItems = [
  { href: "/", label: "Home" },
  { href: "/docs", label: "Docs" },
  { href: "/features", label: "Features" },
]

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="sm:hidden">
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-background border-b">
          <nav className="flex flex-col p-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-2 text-sm font-medium text-foreground hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  )
}


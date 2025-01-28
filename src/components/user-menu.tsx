"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, LogOut, Settings } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"
import { LoadingSpinner } from "@/components/ui/spinner"

export function UserMenu() {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()


  useEffect(() => {
    // Check localStorage for the signed-in state on component mount
    const storedSignedInState = localStorage.getItem("isSignedIn")
    if (storedSignedInState === "true") {
      setIsSignedIn(true)
    }
  }, [])

  const handleSignIn = async () => {
    try {
      setIsLoading(true)

      const response = await fetch('/api/docusign/auth')
      const data = await response.json()
      if (data.isAuthenticated) {
        setIsSignedIn(true)
        localStorage.setItem("isSignedIn", "true") // Persist signed-in state
        toast({ title: "You successfully signed in" })
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to sign in",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await fetch('/api/docusign/logout')
      setIsSignedIn(false)
      localStorage.removeItem("isSignedIn") // Clear signed-in state
      toast({ title: "Signed out successfully" })
    } catch {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      })
    }
  }

  if (!isSignedIn) {
    return (
      <Button onClick={handleSignIn} variant="outline">
        {isLoading ? "Signing in..." : "Sign In"}
      </Button>
    )
  }

  return (
    <>
      <LoadingSpinner show={isLoading} />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button disabled={isLoading} variant="ghost" className="relative h-8 w-8 rounded-full">
            <User className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}


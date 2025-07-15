"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { User } from "lucide-react"

interface DemoAuthFallbackProps {
  onDemoLogin: (userData: { id: string; email: string; name: string }) => void
}

export function DemoAuthFallback({ onDemoLogin }: DemoAuthFallbackProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const { toast } = useToast()

  const handleDemoLogin = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim() || !email.trim()) {
      toast({
        title: "Please fill in all fields",
        description: "Name and email are required for demo access.",
        variant: "destructive",
      })
      return
    }

    const userData = {
      id: `demo-${Date.now()}`,
      email: email.trim(),
      name: name.trim(),
    }

    // Store in localStorage for demo purposes
    localStorage.setItem("movie-explorer-demo-user", JSON.stringify(userData))

    onDemoLogin(userData)

    toast({
      title: "Demo Access Granted!",
      description: "You're now using Movie Explorer in demo mode.",
    })
  }

  return (
    <Card className="max-w-md mx-auto mt-8">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <User className="h-5 w-5" />
          Demo Access
        </CardTitle>
        <CardDescription>Try Movie Explorer without Firebase setup</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleDemoLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="demo-name">Your Name</Label>
            <Input
              id="demo-name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="demo-email">Email</Label>
            <Input
              id="demo-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Continue with Demo
          </Button>
        </form>
        <div className="mt-4 text-xs text-muted-foreground text-center">
          <p>Demo mode stores data locally and doesn't require Firebase authentication.</p>
        </div>
      </CardContent>
    </Card>
  )
}

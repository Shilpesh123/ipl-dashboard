"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy } from "lucide-react"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      window.location.href = "/"
    }, 1500)
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${isDarkMode ? "bg-gray-900" : "bg-blue-50"}`}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Trophy className={`h-8 w-8 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
            <span className={`ml-2 text-2xl font-bold ${isDarkMode ? "text-white" : "text-blue-600"}`}>
              IPL Dashboard
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleDarkMode}
            className={isDarkMode ? "text-white" : "text-gray-700"}
          >
            {isDarkMode ? "☀️ Light" : "🌙 Dark"}
          </Button>
        </div>

        <Card className={`border-2 ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
          <CardHeader>
            <CardTitle className={`text-2xl font-bold ${isDarkMode ? "text-white" : ""}`}>Sign In</CardTitle>
            <CardDescription className={isDarkMode ? "text-gray-400" : ""}>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="email" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="social">Social</TabsTrigger>
              </TabsList>
              <TabsContent value="email">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className={isDarkMode ? "text-gray-300" : ""}>
                        Email
                      </Label>
                      <motion.div whileFocus={{ scale: 1.02 }} className="relative">
                        <Input
                          id="email"
                          placeholder="m.dhoni@example.com"
                          type="email"
                          required
                          className={`h-11 ${isDarkMode ? "bg-gray-700 border-gray-600 text-white" : ""}`}
                        />
                      </motion.div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password" className={isDarkMode ? "text-gray-300" : ""}>
                          Password
                        </Label>
                        <Link
                          href="#"
                          className={`text-xs underline ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <motion.div whileFocus={{ scale: 1.02 }} className="relative">
                        <Input
                          id="password"
                          type="password"
                          required
                          className={`h-11 ${isDarkMode ? "bg-gray-700 border-gray-600 text-white" : ""}`}
                        />
                      </motion.div>
                    </div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button type="submit" className="w-full h-11 bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                        {isLoading ? (
                          <div className="flex items-center">
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Signing In...
                          </div>
                        ) : (
                          "Sign In"
                        )}
                      </Button>
                    </motion.div>
                  </div>
                </form>
              </TabsContent>
              <TabsContent value="social">
                <div className="space-y-4">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      variant="outline"
                      className={`w-full h-11 ${isDarkMode ? "border-gray-600 text-white hover:bg-gray-700" : ""}`}
                    >
                      <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"
                        />
                      </svg>
                      Sign in with Google
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      variant="outline"
                      className={`w-full h-11 ${isDarkMode ? "border-gray-600 text-white hover:bg-gray-700" : ""}`}
                    >
                      <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                      Sign in with Twitter
                    </Button>
                  </motion.div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>Don't have an account? </span>
              <Link href="#" className={`font-medium underline ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}>
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

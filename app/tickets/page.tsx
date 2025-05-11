"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, CreditCard, MapPin, Ticket, User, Mail, Phone } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"

const matches = [
  {
    id: "match1",
    team1: "CSK",
    team2: "MI",
    date: "Apr 12, 2025",
    time: "7:30 PM",
    venue: "Wankhede Stadium, Mumbai",
    team1Logo: "/placeholder.svg?height=40&width=40",
    team2Logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "match2",
    team1: "RCB",
    team2: "KKR",
    date: "Apr 14, 2025",
    time: "7:30 PM",
    venue: "M. Chinnaswamy Stadium, Bangalore",
    team1Logo: "/placeholder.svg?height=40&width=40",
    team2Logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "match3",
    team1: "DC",
    team2: "PBKS",
    date: "Apr 16, 2025",
    time: "3:30 PM",
    venue: "Arun Jaitley Stadium, Delhi",
    team1Logo: "/placeholder.svg?height=40&width=40",
    team2Logo: "/placeholder.svg?height=40&width=40",
  },
]

const ticketCategories = [
  { id: "general", name: "General Stand", price: 1000, availableSeats: 500 },
  { id: "premium", name: "Premium Stand", price: 2500, availableSeats: 300 },
  { id: "vip", name: "VIP Box", price: 5000, availableSeats: 100 },
  { id: "corporate", name: "Corporate Box", price: 8000, availableSeats: 50 },
]

const paymentMethods = [
  { id: "credit-card", name: "Credit/Debit Card" },
  { id: "upi", name: "UPI Payment" },
  { id: "net-banking", name: "Net Banking" },
  { id: "wallet", name: "Digital Wallet" },
]

export default function TicketsPage() {
  const { toast } = useToast()
  const [selectedMatch, setSelectedMatch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [step, setStep] = useState(1)
  const [isBookingComplete, setIsBookingComplete] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedSeats, setSelectedSeats] = useState<string[]>([])
  const [availableSeats, setAvailableSeats] = useState<string[]>([])
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [bookingId, setBookingId] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    upiId: "",
    saveDetails: false,
  })

  // Handle match selection from URL parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const matchParam = searchParams.get("match")

    if (matchParam) {
      // Find the match by ID or other identifier
      const matchId = matches.find(
        (m) => m.id === matchParam || `${m.team1.toLowerCase()}-vs-${m.team2.toLowerCase()}` === matchParam,
      )?.id

      if (matchId) {
        setSelectedMatch(matchId)
      }
    }
  }, [])

  const match = matches.find((m) => m.id === selectedMatch)
  const category = ticketCategories.find((c) => c.id === selectedCategory)

  const totalPrice = category ? category.price * quantity : 0
  const convenienceFee = totalPrice * 0.05 // 5% convenience fee
  const totalAmount = totalPrice + convenienceFee

  // Generate available seats based on selected category
  useEffect(() => {
    if (selectedCategory && quantity > 0) {
      const category = ticketCategories.find((c) => c.id === selectedCategory)
      if (category) {
        const sectionCode = category.id.charAt(0).toUpperCase()
        const seats: string[] = []

        // Generate random available seats
        for (let row = 1; row <= 10; row++) {
          for (let seat = 1; seat <= 20; seat++) {
            // Make some seats "unavailable" randomly
            if (Math.random() > 0.3) {
              seats.push(`${sectionCode}${row}-${seat}`)
            }
          }
        }

        setAvailableSeats(seats)

        // Reset selected seats when category changes
        setSelectedSeats([])
      }
    }
  }, [selectedCategory, quantity])

  const handleSeatToggle = (seat: string) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat))
    } else {
      if (selectedSeats.length < quantity) {
        setSelectedSeats([...selectedSeats, seat])
      } else {
        toast({
          title: "Maximum seats selected",
          description: `You can only select ${quantity} seats. Deselect a seat to select another.`,
          variant: "destructive",
        })
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleContinue = () => {
    if (step === 1 && !selectedMatch) {
      toast({
        title: "Please select a match",
        description: "You need to select a match to continue.",
        variant: "destructive",
      })
      return
    }

    if (step === 2 && (!selectedCategory || selectedSeats.length < quantity)) {
      toast({
        title: "Incomplete selection",
        description: selectedCategory
          ? `Please select ${quantity} seats to continue.`
          : "Please select a ticket category to continue.",
        variant: "destructive",
      })
      return
    }

    if (step === 3) {
      // Validate payment information
      if (paymentMethod === "credit-card") {
        if (!formData.cardNumber || !formData.expiryDate || !formData.cvv) {
          toast({
            title: "Incomplete payment information",
            description: "Please fill in all card details to continue.",
            variant: "destructive",
          })
          return
        }
      } else if (paymentMethod === "upi" && !formData.upiId) {
        toast({
          title: "Incomplete payment information",
          description: "Please enter your UPI ID to continue.",
          variant: "destructive",
        })
        return
      }

      if (!formData.name || !formData.email || !formData.phone) {
        toast({
          title: "Incomplete contact information",
          description: "Please fill in all contact details to continue.",
          variant: "destructive",
        })
        return
      }

      // Process payment
      setIsProcessing(true)

      // Simulate API call to backend
      setTimeout(() => {
        setIsProcessing(false)
        setIsBookingComplete(true)
        setBookingId(`IPL-${Math.floor(100000 + Math.random() * 900000)}`)
      }, 2000)

      return
    }

    if (step < 3) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const resetBooking = () => {
    setSelectedMatch("")
    setSelectedCategory("")
    setQuantity(1)
    setStep(1)
    setIsBookingComplete(false)
    setSelectedSeats([])
    setPaymentMethod("credit-card")
    setFormData({
      name: "",
      email: "",
      phone: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      upiId: "",
      saveDetails: false,
    })
  }

  // Function to render seat grid
  const renderSeatGrid = () => {
    if (!selectedCategory) return null

    const category = ticketCategories.find((c) => c.id === selectedCategory)
    if (!category) return null

    const sectionCode = category.id.charAt(0).toUpperCase()
    const rows = 5
    const seatsPerRow = 10

    return (
      <div className="mt-6">
        <div className="mb-4 text-center">
          <div className="w-full h-8 bg-gray-300 dark:bg-gray-700 rounded-t-lg flex items-center justify-center text-sm font-medium">
            SCREEN
          </div>
        </div>

        <div className="grid grid-cols-10 gap-2 mb-6">
          {Array.from({ length: rows * seatsPerRow }).map((_, index) => {
            const row = Math.floor(index / seatsPerRow) + 1
            const seat = (index % seatsPerRow) + 1
            const seatId = `${sectionCode}${row}-${seat}`
            const isAvailable = availableSeats.includes(seatId)
            const isSelected = selectedSeats.includes(seatId)

            return (
              <motion.button
                key={seatId}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`h-8 w-8 rounded-md flex items-center justify-center text-xs font-medium transition-colors ${
                  isSelected
                    ? "bg-blue-600 text-white"
                    : isAvailable
                      ? "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
                      : "bg-gray-300 dark:bg-gray-700 cursor-not-allowed opacity-50"
                }`}
                onClick={() => isAvailable && handleSeatToggle(seatId)}
                disabled={!isAvailable || (isSelected === false && selectedSeats.length >= quantity)}
              >
                {seat}
              </motion.button>
            )
          })}
        </div>

        <div className="flex justify-center space-x-8 text-sm">
          <div className="flex items-center">
            <div className="h-4 w-4 rounded-sm bg-gray-100 dark:bg-gray-800 mr-2"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center">
            <div className="h-4 w-4 rounded-sm bg-blue-600 mr-2"></div>
            <span>Selected</span>
          </div>
          <div className="flex items-center">
            <div className="h-4 w-4 rounded-sm bg-gray-300 dark:bg-gray-700 opacity-50 mr-2"></div>
            <span>Unavailable</span>
          </div>
        </div>

        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm">
            <span className="font-medium">Selected Seats:</span>{" "}
            {selectedSeats.length > 0 ? selectedSeats.join(", ") : "None selected"}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <Ticket className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
            <div>
              <h1 className="text-3xl font-bold">IPL Ticket Booking</h1>
              <p className="text-gray-500 dark:text-gray-400">Book tickets for upcoming IPL matches</p>
            </div>
          </div>

          {isBookingComplete ? (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="border-green-500 dark:border-green-400 shadow-lg">
                  <CardHeader className="bg-green-500 dark:bg-green-600 text-white">
                    <div className="flex items-center justify-center">
                      <svg className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <CardTitle className="text-center text-2xl">Booking Confirmed!</CardTitle>
                    <CardDescription className="text-center text-white/80">
                      Your booking ID is: <span className="font-bold">{bookingId}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      <div className="flex justify-center">
                        <div className="flex items-center">
                          <img src={match?.team1Logo || "/placeholder.svg"} alt={match?.team1} className="w-12 h-12" />
                          <span className="mx-3 text-xl font-bold">VS</span>
                          <img src={match?.team2Logo || "/placeholder.svg"} alt={match?.team2} className="w-12 h-12" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <p className="text-sm text-gray-500 dark:text-gray-400">Match</p>
                          <p className="font-medium">
                            {match?.team1} vs {match?.team2}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-gray-500 dark:text-gray-400">Date & Time</p>
                          <p className="font-medium">
                            {match?.date}, {match?.time}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-gray-500 dark:text-gray-400">Venue</p>
                          <p className="font-medium">{match?.venue}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-gray-500 dark:text-gray-400">Ticket Category</p>
                          <p className="font-medium">{category?.name}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-gray-500 dark:text-gray-400">Seats</p>
                          <p className="font-medium">{selectedSeats.join(", ")}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-gray-500 dark:text-gray-400">Total Amount</p>
                          <p className="font-medium">₹{totalAmount.toLocaleString()}</p>
                        </div>
                      </div>

                      <div className="border-t border-dashed border-gray-200 dark:border-gray-700 pt-4">
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                          <p className="text-sm">
                            Your booking confirmation and tickets have been sent to{" "}
                            <span className="font-medium">{formData.email}</span>. You can also download your tickets
                            from the link below.
                          </p>

                          <div className="mt-4 flex justify-center">
                            <Button className="bg-blue-600 hover:bg-blue-700">Download Tickets</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-4">
                    <Button onClick={resetBooking} variant="outline" className="w-full">
                      Book More Tickets
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </AnimatePresence>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Book IPL Match Tickets</CardTitle>
                <CardDescription>Follow the steps below to book your tickets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div
                        className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"}`}
                      >
                        1
                      </div>
                      <span className="ml-2 font-medium">Select Match</span>
                    </div>
                    <div className="hidden sm:block w-16 h-0.5 bg-gray-200 dark:bg-gray-700"></div>
                    <div className="flex items-center">
                      <div
                        className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"}`}
                      >
                        2
                      </div>
                      <span className="ml-2 font-medium">Choose Seats</span>
                    </div>
                    <div className="hidden sm:block w-16 h-0.5 bg-gray-200 dark:bg-gray-700"></div>
                    <div className="flex items-center">
                      <div
                        className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 3 ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"}`}
                      >
                        3
                      </div>
                      <span className="ml-2 font-medium">Payment</span>
                    </div>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="match">Select Match</Label>
                          <Select value={selectedMatch} onValueChange={setSelectedMatch}>
                            <SelectTrigger id="match">
                              <SelectValue placeholder="Select a match" />
                            </SelectTrigger>
                            <SelectContent>
                              {matches.map((match) => (
                                <SelectItem key={match.id} value={match.id}>
                                  {match.team1} vs {match.team2} - {match.date}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {selectedMatch && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                              <div className="flex items-center mb-4 sm:mb-0">
                                <div className="flex items-center">
                                  <img
                                    src={match?.team1Logo || "/placeholder.svg"}
                                    alt={match?.team1}
                                    className="w-10 h-10"
                                  />
                                  <span className="mx-2 font-bold">{match?.team1}</span>
                                </div>
                                <span className="mx-2">vs</span>
                                <div className="flex items-center">
                                  <span className="mx-2 font-bold">{match?.team2}</span>
                                  <img
                                    src={match?.team2Logo || "/placeholder.svg"}
                                    alt={match?.team2}
                                    className="w-10 h-10"
                                  />
                                </div>
                              </div>
                              <div className="space-y-1">
                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  <span>{match?.date}</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                  <Clock className="h-4 w-4 mr-1" />
                                  <span>{match?.time}</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  <span>{match?.venue}</span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="space-y-6">
                        <div className="space-y-4">
                          <Label>Select Ticket Category</Label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {ticketCategories.map((category) => (
                              <motion.div key={category.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <div
                                  className={`p-4 border rounded-lg cursor-pointer ${selectedCategory === category.id ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-gray-200 dark:border-gray-700"}`}
                                  onClick={() => setSelectedCategory(category.id)}
                                >
                                  <div className="flex justify-between items-center">
                                    <div>
                                      <h4 className="font-medium">{category.name}</h4>
                                      <p className="text-sm text-gray-500 dark:text-gray-400">
                                        ₹{category.price.toLocaleString()} per ticket
                                      </p>
                                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        {category.availableSeats} seats available
                                      </p>
                                    </div>
                                    <div
                                      className={`w-5 h-5 rounded-full border ${selectedCategory === category.id ? "border-blue-500 bg-blue-500" : "border-gray-300 dark:border-gray-600"}`}
                                    >
                                      {selectedCategory === category.id && (
                                        <svg
                                          className="w-5 h-5 text-white"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                          />
                                        </svg>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {selectedCategory && (
                          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="space-y-2">
                              <Label htmlFor="quantity">Number of Tickets</Label>
                              <div className="flex items-center">
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="icon"
                                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                                  disabled={quantity <= 1}
                                >
                                  -
                                </Button>
                                <Input
                                  id="quantity"
                                  type="number"
                                  className="w-16 mx-2 text-center"
                                  value={quantity}
                                  onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
                                  min="1"
                                  max="10"
                                />
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="icon"
                                  onClick={() => quantity < 10 && setQuantity(quantity + 1)}
                                  disabled={quantity >= 10}
                                >
                                  +
                                </Button>
                              </div>
                            </div>

                            {renderSeatGrid()}

                            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                              <div className="flex justify-between mb-2">
                                <span>Price per ticket:</span>
                                <span>₹{category?.price.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between mb-2">
                                <span>Quantity:</span>
                                <span>{quantity}</span>
                              </div>
                              <div className="flex justify-between mb-2">
                                <span>Subtotal:</span>
                                <span>₹{totalPrice.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between mb-2">
                                <span>Convenience Fee (5%):</span>
                                <span>₹{convenienceFee.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between font-bold pt-2 border-t border-gray-200 dark:border-gray-700">
                                <span>Total Amount:</span>
                                <span>₹{totalAmount.toLocaleString()}</span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="space-y-6">
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-6">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center mb-4 sm:mb-0">
                              <div className="flex items-center">
                                <img
                                  src={match?.team1Logo || "/placeholder.svg"}
                                  alt={match?.team1}
                                  className="w-10 h-10"
                                />
                                <span className="mx-2 font-bold">{match?.team1}</span>
                              </div>
                              <span className="mx-2">vs</span>
                              <div className="flex items-center">
                                <span className="mx-2 font-bold">{match?.team2}</span>
                                <img
                                  src={match?.team2Logo || "/placeholder.svg"}
                                  alt={match?.team2}
                                  className="w-10 h-10"
                                />
                              </div>
                            </div>
                            <div>
                              <div className="text-sm font-medium">{category?.name}</div>
                              <div className="text-sm">
                                {selectedSeats.length} tickets: {selectedSeats.join(", ")}
                              </div>
                              <div className="text-sm font-bold mt-1">Total: ₹{totalAmount.toLocaleString()}</div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Contact Information</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="name">Full Name</Label>
                              <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                  id="name"
                                  name="name"
                                  placeholder="Enter your full name"
                                  className="pl-10"
                                  value={formData.name}
                                  onChange={handleInputChange}
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="email">Email Address</Label>
                              <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                  id="email"
                                  name="email"
                                  type="email"
                                  placeholder="Enter your email"
                                  className="pl-10"
                                  value={formData.email}
                                  onChange={handleInputChange}
                                />
                              </div>
                            </div>
                            <div className="space-y-2 md:col-span-2">
                              <Label htmlFor="phone">Phone Number</Label>
                              <div className="relative">
                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                  id="phone"
                                  name="phone"
                                  placeholder="Enter your phone number"
                                  className="pl-10"
                                  value={formData.phone}
                                  onChange={handleInputChange}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Payment Method</h3>
                          <Tabs defaultValue="credit-card" onValueChange={setPaymentMethod} value={paymentMethod}>
                            <TabsList className="grid w-full grid-cols-4">
                              <TabsTrigger value="credit-card">Card</TabsTrigger>
                              <TabsTrigger value="upi">UPI</TabsTrigger>
                              <TabsTrigger value="net-banking">Net Banking</TabsTrigger>
                              <TabsTrigger value="wallet">Wallet</TabsTrigger>
                            </TabsList>

                            <TabsContent value="credit-card" className="space-y-4 mt-4">
                              <div className="space-y-2">
                                <Label htmlFor="cardNumber">Card Number</Label>
                                <div className="relative">
                                  <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                  <Input
                                    id="cardNumber"
                                    name="cardNumber"
                                    placeholder="1234 5678 9012 3456"
                                    className="pl-10"
                                    value={formData.cardNumber}
                                    onChange={handleInputChange}
                                  />
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="expiryDate">Expiry Date</Label>
                                  <Input
                                    id="expiryDate"
                                    name="expiryDate"
                                    placeholder="MM/YY"
                                    value={formData.expiryDate}
                                    onChange={handleInputChange}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="cvv">CVV</Label>
                                  <Input
                                    id="cvv"
                                    name="cvv"
                                    type="password"
                                    placeholder="123"
                                    value={formData.cvv}
                                    onChange={handleInputChange}
                                  />
                                </div>
                              </div>
                            </TabsContent>

                            <TabsContent value="upi" className="space-y-4 mt-4">
                              <div className="space-y-2">
                                <Label htmlFor="upiId">UPI ID</Label>
                                <Input
                                  id="upiId"
                                  name="upiId"
                                  placeholder="username@upi"
                                  value={formData.upiId}
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <p className="text-sm">You will receive a payment request on your UPI app.</p>
                              </div>
                            </TabsContent>

                            <TabsContent value="net-banking" className="space-y-4 mt-4">
                              <div className="space-y-2">
                                <Label>Select Bank</Label>
                                <RadioGroup defaultValue="hdfc">
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="hdfc" id="hdfc" />
                                    <Label htmlFor="hdfc">HDFC Bank</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="sbi" id="sbi" />
                                    <Label htmlFor="sbi">State Bank of India</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="icici" id="icici" />
                                    <Label htmlFor="icici">ICICI Bank</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="axis" id="axis" />
                                    <Label htmlFor="axis">Axis Bank</Label>
                                  </div>
                                </RadioGroup>
                              </div>
                            </TabsContent>

                            <TabsContent value="wallet" className="space-y-4 mt-4">
                              <div className="space-y-2">
                                <Label>Select Wallet</Label>
                                <RadioGroup defaultValue="paytm">
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="paytm" id="paytm" />
                                    <Label htmlFor="paytm">Paytm</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="phonepe" id="phonepe" />
                                    <Label htmlFor="phonepe">PhonePe</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="amazonpay" id="amazonpay" />
                                    <Label htmlFor="amazonpay">Amazon Pay</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="mobikwik" id="mobikwik" />
                                    <Label htmlFor="mobikwik">MobiKwik</Label>
                                  </div>
                                </RadioGroup>
                              </div>
                            </TabsContent>
                          </Tabs>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="saveDetails"
                            name="saveDetails"
                            checked={formData.saveDetails}
                            onCheckedChange={(checked) => setFormData({ ...formData, saveDetails: checked as boolean })}
                          />
                          <label
                            htmlFor="saveDetails"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Save my details for future bookings
                          </label>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <div className="flex w-full space-x-2">
                  {step > 1 && (
                    <Button variant="outline" onClick={handleBack} disabled={isProcessing}>
                      Back
                    </Button>
                  )}
                  <Button className="flex-1" onClick={handleContinue} disabled={isProcessing}>
                    {isProcessing ? (
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
                        Processing...
                      </div>
                    ) : step === 3 ? (
                      "Confirm & Pay"
                    ) : (
                      "Continue"
                    )}
                  </Button>
                </div>
                <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">
                  By proceeding, you agree to our Terms of Service and Privacy Policy.
                </p>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

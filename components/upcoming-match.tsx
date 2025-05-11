"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin } from "lucide-react"
import Link from "next/link"

interface UpcomingMatchProps {
  team1: string
  team2: string
  date: string
  time: string
  venue: string
  team1Logo: string
  team2Logo: string
}

export function UpcomingMatch({ team1, team2, date, time, venue, team1Logo, team2Logo }: UpcomingMatchProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  // Calculate time left until match
  useEffect(() => {
    const calculateTimeLeft = () => {
      const matchDate = new Date(`${date} ${time}`)
      const difference = +matchDate - +new Date()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [date, time])

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center mb-4 sm:mb-0">
            <motion.div whileHover={{ scale: 1.1, rotate: -5 }} className="flex flex-col items-center mr-6">
              <img src={team1Logo || "/placeholder.svg"} alt={team1} className="w-10 h-10 mb-1" />
              <span className="font-bold">{team1}</span>
            </motion.div>

            <div className="flex flex-col items-center mx-4">
              <span className="text-xs text-gray-500 dark:text-gray-400 mb-1">VS</span>
              <div className="flex space-x-2 text-xs">
                <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded-full">
                  {timeLeft.days}d
                </div>
                <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded-full">
                  {timeLeft.hours}h
                </div>
                <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded-full">
                  {timeLeft.minutes}m
                </div>
              </div>
            </div>

            <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="flex flex-col items-center ml-6">
              <img src={team2Logo || "/placeholder.svg"} alt={team2} className="w-10 h-10 mb-1" />
              <span className="font-bold">{team2}</span>
            </motion.div>
          </div>

          <div className="flex flex-col items-end">
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-1">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{date}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-1">
              <Clock className="h-4 w-4 mr-1" />
              <span>{time}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{venue}</span>
            </div>
            <Button size="sm" variant="outline" className="text-xs" asChild>
              <Link href={`/tickets?match=${team1.toLowerCase()}-vs-${team2.toLowerCase()}`}>Book Tickets</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

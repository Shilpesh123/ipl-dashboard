"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin } from "lucide-react"

export function FeaturedMatch() {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
      <Card className="overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center mb-4">
                <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">FEATURED MATCH</span>
                <span className="ml-2 bg-red-500 text-white text-xs px-3 py-1 rounded-full animate-pulse">LIVE</span>
              </div>

              <h2 className="text-2xl font-bold mb-2">IPL 2025 Final</h2>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Apr 30, 2025</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>7:30 PM</span>
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>Narendra Modi Stadium, Ahmedabad</span>
                </div>
              </div>

              <Button className="bg-white text-blue-600 hover:bg-blue-50">Watch Live</Button>
            </div>

            <div className="flex items-center">
              <motion.div whileHover={{ scale: 1.05, rotate: -5 }} className="flex flex-col items-center mr-8">
                <div className="bg-white rounded-full p-2 mb-2 shadow-glow-blue">
                  <img src="/placeholder.svg?height=80&width=80" alt="CSK" className="w-20 h-20" />
                </div>
                <span className="font-bold text-xl">CSK</span>
                <span className="text-lg">189/4</span>
              </motion.div>

              <div className="flex flex-col items-center mx-4">
                <span className="text-2xl font-bold mb-2">VS</span>
                <div className="bg-white/20 px-3 py-1 rounded-full text-sm">18.2 Overs</div>
              </div>

              <motion.div whileHover={{ scale: 1.05, rotate: 5 }} className="flex flex-col items-center ml-8">
                <div className="bg-white rounded-full p-2 mb-2 shadow-glow-blue">
                  <img src="/placeholder.svg?height=80&width=80" alt="MI" className="w-20 h-20" />
                </div>
                <span className="font-bold text-xl">MI</span>
                <span className="text-lg">145/7</span>
              </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

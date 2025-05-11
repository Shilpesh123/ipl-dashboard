"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

const teams = [
  {
    id: "csk",
    name: "Chennai Super Kings",
    shortName: "CSK",
    logo: "/placeholder.svg?height=120&width=120",
    primaryColor: "#FFFF3C",
    secondaryColor: "#0081E9",
    captain: "MS Dhoni",
    homeGround: "M. A. Chidambaram Stadium",
    wins: 5,
    losses: 2,
  },
  {
    id: "mi",
    name: "Mumbai Indians",
    shortName: "MI",
    logo: "/placeholder.svg?height=120&width=120",
    primaryColor: "#004BA0",
    secondaryColor: "#D1AB3E",
    captain: "Rohit Sharma",
    homeGround: "Wankhede Stadium",
    wins: 4,
    losses: 3,
  },
  {
    id: "rcb",
    name: "Royal Challengers Bangalore",
    shortName: "RCB",
    logo: "/placeholder.svg?height=120&width=120",
    primaryColor: "#EC1C24",
    secondaryColor: "#000000",
    captain: "Virat Kohli",
    homeGround: "M. Chinnaswamy Stadium",
    wins: 3,
    losses: 4,
  },
  {
    id: "kkr",
    name: "Kolkata Knight Riders",
    shortName: "KKR",
    logo: "/placeholder.svg?height=120&width=120",
    primaryColor: "#3A225D",
    secondaryColor: "#B3A123",
    captain: "Shreyas Iyer",
    homeGround: "Eden Gardens",
    wins: 6,
    losses: 1,
  },
  {
    id: "dc",
    name: "Delhi Capitals",
    shortName: "DC",
    logo: "/placeholder.svg?height=120&width=120",
    primaryColor: "#0078BC",
    secondaryColor: "#EF1B23",
    captain: "Rishabh Pant",
    homeGround: "Arun Jaitley Stadium",
    wins: 2,
    losses: 5,
  },
  {
    id: "pbks",
    name: "Punjab Kings",
    shortName: "PBKS",
    logo: "/placeholder.svg?height=120&width=120",
    primaryColor: "#ED1B24",
    secondaryColor: "#A7A9AC",
    captain: "Shikhar Dhawan",
    homeGround: "IS Bindra Stadium",
    wins: 3,
    losses: 4,
  },
  {
    id: "rr",
    name: "Rajasthan Royals",
    shortName: "RR",
    logo: "/placeholder.svg?height=120&width=120",
    primaryColor: "#EA1A85",
    secondaryColor: "#254AA5",
    captain: "Sanju Samson",
    homeGround: "Sawai Mansingh Stadium",
    wins: 4,
    losses: 3,
  },
  {
    id: "srh",
    name: "Sunrisers Hyderabad",
    shortName: "SRH",
    logo: "/placeholder.svg?height=120&width=120",
    primaryColor: "#F26522",
    secondaryColor: "#000000",
    captain: "Kane Williamson",
    homeGround: "Rajiv Gandhi Intl. Cricket Stadium",
    wins: 2,
    losses: 5,
  },
]

export default function TeamsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredTeams = teams.filter(
    (team) =>
      team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.shortName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">IPL Teams</h1>
            <p className="text-gray-500 dark:text-gray-400">All teams participating in the Indian Premier League</p>
          </div>

          <div className="mt-4 md:mt-0 relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search teams..."
              className="pl-10 bg-white dark:bg-gray-800"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTeams.map((team, index) => (
            <motion.div
              key={team.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/teams/${team.id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <div className="h-2" style={{ backgroundColor: team.primaryColor }}></div>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <motion.div whileHover={{ scale: 1.05, rotate: 5 }} className="mb-4">
                        <img
                          src={team.logo || "/placeholder.svg"}
                          alt={team.name}
                          className="w-24 h-24 object-contain"
                        />
                      </motion.div>

                      <h2 className="text-xl font-bold mb-1">{team.name}</h2>
                      <div
                        className="text-sm font-bold px-2 py-0.5 rounded-full mb-4"
                        style={{
                          backgroundColor: team.primaryColor,
                          color: team.secondaryColor === "#000000" ? "#FFFFFF" : team.secondaryColor,
                        }}
                      >
                        {team.shortName}
                      </div>

                      <div className="space-y-2 w-full">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500 dark:text-gray-400">Captain:</span>
                          <span className="font-medium">{team.captain}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500 dark:text-gray-400">Home Ground:</span>
                          <span className="font-medium truncate ml-2 text-right">{team.homeGround}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500 dark:text-gray-400">Record:</span>
                          <span className="font-medium">
                            <span className="text-green-600 dark:text-green-400">{team.wins}W</span>
                            {" - "}
                            <span className="text-red-600 dark:text-red-400">{team.losses}L</span>
                          </span>
                        </div>
                      </div>

                      <Button
                        className="mt-6 w-full"
                        style={{
                          backgroundColor: team.primaryColor,
                          color: team.secondaryColor === "#000000" ? "#FFFFFF" : team.secondaryColor,
                        }}
                      >
                        View Team
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredTeams.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No teams found</h3>
            <p className="text-gray-500 dark:text-gray-400">Try a different search term</p>
          </div>
        )}
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export default function SchedulePage() {
  const [teamFilter, setTeamFilter] = useState("all")

  const teams = [
    { id: "all", name: "All Teams" },
    { id: "CSK", name: "Chennai Super Kings" },
    { id: "MI", name: "Mumbai Indians" },
    { id: "RCB", name: "Royal Challengers Bangalore" },
    { id: "KKR", name: "Kolkata Knight Riders" },
    { id: "DC", name: "Delhi Capitals" },
    { id: "PBKS", name: "Punjab Kings" },
    { id: "RR", name: "Rajasthan Royals" },
    { id: "SRH", name: "Sunrisers Hyderabad" },
    { id: "GT", name: "Gujarat Titans" },
    { id: "LSG", name: "Lucknow Super Giants" },
  ]

  const upcomingMatches = [
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
    {
      id: "match4",
      team1: "GT",
      team2: "RR",
      date: "Apr 18, 2025",
      time: "7:30 PM",
      venue: "Narendra Modi Stadium, Ahmedabad",
      team1Logo: "/placeholder.svg?height=40&width=40",
      team2Logo: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "match5",
      team1: "SRH",
      team2: "LSG",
      date: "Apr 20, 2025",
      time: "3:30 PM",
      venue: "Rajiv Gandhi Intl. Cricket Stadium, Hyderabad",
      team1Logo: "/placeholder.svg?height=40&width=40",
      team2Logo: "/placeholder.svg?height=40&width=40",
    },
  ]

  const completedMatches = [
    {
      id: "match6",
      team1: "MI",
      team2: "RCB",
      date: "Apr 2, 2025",
      time: "7:30 PM",
      venue: "Wankhede Stadium, Mumbai",
      team1Logo: "/placeholder.svg?height=40&width=40",
      team2Logo: "/placeholder.svg?height=40&width=40",
      result: "MI won by 5 wickets",
      team1Score: "185/8",
      team2Score: "186/5",
    },
    {
      id: "match7",
      team1: "CSK",
      team2: "KKR",
      date: "Apr 4, 2025",
      time: "7:30 PM",
      venue: "M. A. Chidambaram Stadium, Chennai",
      team1Logo: "/placeholder.svg?height=40&width=40",
      team2Logo: "/placeholder.svg?height=40&width=40",
      result: "CSK won by 8 wickets",
      team1Score: "142/9",
      team2Score: "143/2",
    },
    {
      id: "match8",
      team1: "DC",
      team2: "RR",
      date: "Apr 6, 2025",
      time: "3:30 PM",
      venue: "Arun Jaitley Stadium, Delhi",
      team1Logo: "/placeholder.svg?height=40&width=40",
      team2Logo: "/placeholder.svg?height=40&width=40",
      result: "RR won by 15 runs",
      team1Score: "178/7",
      team2Score: "193/5",
    },
    {
      id: "match9",
      team1: "PBKS",
      team2: "SRH",
      date: "Apr 8, 2025",
      time: "7:30 PM",
      venue: "IS Bindra Stadium, Mohali",
      team1Logo: "/placeholder.svg?height=40&width=40",
      team2Logo: "/placeholder.svg?height=40&width=40",
      result: "Match tied (PBKS won Super Over)",
      team1Score: "165/8",
      team2Score: "165/9",
    },
    {
      id: "match10",
      team1: "GT",
      team2: "LSG",
      date: "Apr 10, 2025",
      time: "7:30 PM",
      venue: "Narendra Modi Stadium, Ahmedabad",
      team1Logo: "/placeholder.svg?height=40&width=40",
      team2Logo: "/placeholder.svg?height=40&width=40",
      result: "GT won by 6 wickets",
      team1Score: "172/8",
      team2Score: "173/4",
    },
  ]

  const filterMatches = (matches) => {
    if (teamFilter === "all") return matches
    return matches.filter((match) => match.team1 === teamFilter || match.team2 === teamFilter)
  }

  const filteredUpcomingMatches = filterMatches(upcomingMatches)
  const filteredCompletedMatches = filterMatches(completedMatches)

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Match Schedule & Results</h1>
            <p className="text-gray-500 dark:text-gray-400">
              All IPL 2025 matches - upcoming fixtures and past results
            </p>
          </div>

          <div className="mt-4 md:mt-0 w-full md:w-64">
            <Select value={teamFilter} onValueChange={setTeamFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by team" />
              </SelectTrigger>
              <SelectContent>
                {teams.map((team) => (
                  <SelectItem key={team.id} value={team.id}>
                    {team.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="upcoming">Upcoming Matches</TabsTrigger>
            <TabsTrigger value="completed">Completed Matches</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            {filteredUpcomingMatches.length > 0 ? (
              <div className="grid gap-6">
                {filteredUpcomingMatches.map((match, index) => (
                  <motion.div
                    key={match.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div className="flex items-center mb-4 md:mb-0">
                            <div className="flex flex-col items-center mr-6">
                              <img
                                src={match.team1Logo || "/placeholder.svg"}
                                alt={match.team1}
                                className="w-16 h-16 mb-2"
                              />
                              <span className="font-bold text-lg">{match.team1}</span>
                            </div>

                            <div className="flex flex-col items-center mx-6">
                              <span className="text-xl font-bol mb-2">VS</span>
                              <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/20">
                                Match {index + 1}
                              </Badge>
                            </div>

                            <div className="flex flex-col items-center ml-6">
                              <img
                                src={match.team2Logo || "/placeholder.svg"}
                                alt={match.team2}
                                className="w-16 h-16 mb-2"
                              />
                              <span className="font-bold text-lg">{match.team2}</span>
                            </div>
                          </div>

                          <div className="flex flex-col items-start md:items-end">
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-1">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>{match.date}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-1">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{match.time}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span>{match.venue}</span>
                            </div>
                            <Button size="sm" asChild>
                              <Link href={`/tickets?match=${match.id}`}>Book Tickets</Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No upcoming matches found</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {teamFilter !== "all" ? `No upcoming matches for ${teamFilter}` : "No upcoming matches scheduled"}
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed">
            {filteredCompletedMatches.length > 0 ? (
              <div className="grid gap-6">
                {filteredCompletedMatches.map((match, index) => (
                  <motion.div
                    key={match.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div className="flex items-center mb-4 md:mb-0">
                            <div className="flex flex-col items-center mr-6">
                              <img
                                src={match.team1Logo || "/placeholder.svg"}
                                alt={match.team1}
                                className="w-16 h-16 mb-2"
                              />
                              <span className="font-bold text-lg">{match.team1}</span>
                              <span className="text-sm">{match.team1Score}</span>
                            </div>

                            <div className="flex flex-col items-center mx-6">
                              <span className="text-xl font-bold mb-2">VS</span>
                              <Badge variant="outline" className="bg-gray-50 dark:bg-gray-800">
                                Completed
                              </Badge>
                            </div>

                            <div className="flex flex-col items-center ml-6">
                              <img
                                src={match.team2Logo || "/placeholder.svg"}
                                alt={match.team2}
                                className="w-16 h-16 mb-2"
                              />
                              <span className="font-bold text-lg">{match.team2}</span>
                              <span className="text-sm">{match.team2Score}</span>
                            </div>
                          </div>

                          <div className="flex flex-col items-start md:items-end">
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-1">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>{match.date}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-1">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{match.time}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span>{match.venue}</span>
                            </div>
                            <div className="font-medium text-sm">{match.result}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No completed matches found</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {teamFilter !== "all" ? `No completed matches for ${teamFilter}` : "No completed matches available"}
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronLeft, Trophy, Calendar, MapPin } from "lucide-react"

// Mock data for team details
const teamData = {
  csk: {
    id: "csk",
    name: "Chennai Super Kings",
    shortName: "CSK",
    logo: "/placeholder.svg?height=200&width=200",
    primaryColor: "#FFFF3C",
    secondaryColor: "#0081E9",
    captain: "MS Dhoni",
    homeGround: "M. A. Chidambaram Stadium",
    wins: 5,
    losses: 2,
    championships: 4,
    description:
      "Chennai Super Kings (CSK) is a franchise cricket team based in Chennai, Tamil Nadu. They play in the Indian Premier League (IPL). Founded in 2008, the team plays its home matches at the M. A. Chidambaram Stadium in Chennai. The team is owned by Chennai Super Kings Cricket Ltd and MS Dhoni is the current captain of the team.",
    coach: "Stephen Fleming",
    owner: "Chennai Super Kings Cricket Ltd.",
    founded: 2008,
  },
  mi: {
    id: "mi",
    name: "Mumbai Indians",
    shortName: "MI",
    logo: "/placeholder.svg?height=200&width=200",
    primaryColor: "#004BA0",
    secondaryColor: "#D1AB3E",
    captain: "Rohit Sharma",
    homeGround: "Wankhede Stadium",
    wins: 4,
    losses: 3,
    championships: 5,
    description:
      "Mumbai Indians (MI) is a franchise cricket team based in Mumbai, Maharashtra. They play in the Indian Premier League (IPL). Founded in 2008, the team plays its home matches at the Wankhede Stadium in Mumbai. The team is owned by India's biggest conglomerate, Reliance Industries, through its 100% subsidiary IndiaWin Sports.",
    coach: "Mahela Jayawardene",
    owner: "Reliance Industries",
    founded: 2008,
  },
  rcb: {
    id: "rcb",
    name: "Royal Challengers Bangalore",
    shortName: "RCB",
    logo: "/placeholder.svg?height=200&width=200",
    primaryColor: "#EC1C24",
    secondaryColor: "#000000",
    captain: "Virat Kohli",
    homeGround: "M. Chinnaswamy Stadium",
    wins: 3,
    losses: 4,
    championships: 0,
    description:
      "Royal Challengers Bangalore (RCB) is a franchise cricket team based in Bangalore, Karnataka. They play in the Indian Premier League (IPL). Founded in 2008, the team plays its home matches at the M. Chinnaswamy Stadium in Bangalore. The team is owned by United Spirits and named after the company's liquor brand Royal Challenge.",
    coach: "Simon Katich",
    owner: "United Spirits",
    founded: 2008,
  },
  // Add more teams as needed
}

// Mock data for players
const playersData = {
  csk: [
    {
      id: 1,
      name: "MS Dhoni",
      role: "Wicket-keeper Batsman",
      country: "India",
      avatar: "/placeholder.svg?height=100&width=100",
      matches: 220,
      runs: 4746,
      average: 39.55,
      strikeRate: 135.83,
      wickets: 0,
      economy: 0,
    },
    {
      id: 2,
      name: "Ravindra Jadeja",
      role: "All-rounder",
      country: "India",
      avatar: "/placeholder.svg?height=100&width=100",
      matches: 200,
      runs: 2386,
      average: 26.51,
      strikeRate: 127.61,
      wickets: 132,
      economy: 7.62,
    },
    {
      id: 3,
      name: "Ruturaj Gaikwad",
      role: "Batsman",
      country: "India",
      avatar: "/placeholder.svg?height=100&width=100",
      matches: 36,
      runs: 1320,
      average: 37.71,
      strikeRate: 130.82,
      wickets: 0,
      economy: 0,
    },
    {
      id: 4,
      name: "Deepak Chahar",
      role: "Bowler",
      country: "India",
      avatar: "/placeholder.svg?height=100&width=100",
      matches: 63,
      runs: 79,
      average: 13.17,
      strikeRate: 138.6,
      wickets: 59,
      economy: 7.8,
    },
    {
      id: 5,
      name: "Ambati Rayudu",
      role: "Batsman",
      country: "India",
      avatar: "/placeholder.svg?height=100&width=100",
      matches: 188,
      runs: 4187,
      average: 29.28,
      strikeRate: 127.26,
      wickets: 0,
      economy: 0,
    },
  ],
  mi: [
    {
      id: 1,
      name: "Rohit Sharma",
      role: "Batsman",
      country: "India",
      avatar: "/placeholder.svg?height=100&width=100",
      matches: 227,
      runs: 5879,
      average: 30.3,
      strikeRate: 130.05,
      wickets: 15,
      economy: 8.75,
    },
    {
      id: 2,
      name: "Jasprit Bumrah",
      role: "Bowler",
      country: "India",
      avatar: "/placeholder.svg?height=100&width=100",
      matches: 106,
      runs: 56,
      average: 5.6,
      strikeRate: 84.85,
      wickets: 130,
      economy: 7.42,
    },
    {
      id: 3,
      name: "Kieron Pollard",
      role: "All-rounder",
      country: "West Indies",
      avatar: "/placeholder.svg?height=100&width=100",
      matches: 189,
      runs: 3412,
      average: 28.67,
      strikeRate: 149.78,
      wickets: 65,
      economy: 8.97,
    },
    {
      id: 4,
      name: "Suryakumar Yadav",
      role: "Batsman",
      country: "India",
      avatar: "/placeholder.svg?height=100&width=100",
      matches: 115,
      runs: 2341,
      average: 28.55,
      strikeRate: 136.96,
      wickets: 0,
      economy: 0,
    },
    {
      id: 5,
      name: "Hardik Pandya",
      role: "All-rounder",
      country: "India",
      avatar: "/placeholder.svg?height=100&width=100",
      matches: 92,
      runs: 1476,
      average: 27.33,
      strikeRate: 153.91,
      wickets: 42,
      economy: 9.06,
    },
  ],
  rcb: [
    {
      id: 1,
      name: "Virat Kohli",
      role: "Batsman",
      country: "India",
      avatar: "/placeholder.svg?height=100&width=100",
      matches: 223,
      runs: 6624,
      average: 36.2,
      strikeRate: 129.15,
      wickets: 4,
      economy: 8.8,
    },
    {
      id: 2,
      name: "AB de Villiers",
      role: "Batsman",
      country: "South Africa",
      avatar: "/placeholder.svg?height=100&width=100",
      matches: 184,
      runs: 5162,
      average: 39.71,
      strikeRate: 151.68,
      wickets: 0,
      economy: 0,
    },
    {
      id: 3,
      name: "Yuzvendra Chahal",
      role: "Bowler",
      country: "India",
      avatar: "/placeholder.svg?height=100&width=100",
      matches: 114,
      runs: 22,
      average: 5.5,
      strikeRate: 84.62,
      wickets: 139,
      economy: 7.59,
    },
    {
      id: 4,
      name: "Glenn Maxwell",
      role: "All-rounder",
      country: "Australia",
      avatar: "/placeholder.svg?height=100&width=100",
      matches: 97,
      runs: 2018,
      average: 26.21,
      strikeRate: 154.68,
      wickets: 22,
      economy: 8.33,
    },
    {
      id: 5,
      name: "Mohammed Siraj",
      role: "Bowler",
      country: "India",
      avatar: "/placeholder.svg?height=100&width=100",
      matches: 50,
      runs: 39,
      average: 7.8,
      strikeRate: 90.7,
      wickets: 56,
      economy: 8.78,
    },
  ],
  // Add more teams as needed
}

// Mock data for upcoming matches
const upcomingMatches = {
  csk: [
    {
      id: "match1",
      opponent: "MI",
      date: "Apr 12, 2025",
      time: "7:30 PM",
      venue: "Wankhede Stadium, Mumbai",
      isHome: false,
    },
    {
      id: "match2",
      opponent: "RCB",
      date: "Apr 18, 2025",
      time: "7:30 PM",
      venue: "M. A. Chidambaram Stadium, Chennai",
      isHome: true,
    },
  ],
  mi: [
    {
      id: "match1",
      opponent: "CSK",
      date: "Apr 12, 2025",
      time: "7:30 PM",
      venue: "Wankhede Stadium, Mumbai",
      isHome: true,
    },
    {
      id: "match3",
      opponent: "KKR",
      date: "Apr 20, 2025",
      time: "3:30 PM",
      venue: "Eden Gardens, Kolkata",
      isHome: false,
    },
  ],
  rcb: [
    {
      id: "match2",
      opponent: "CSK",
      date: "Apr 18, 2025",
      time: "7:30 PM",
      venue: "M. A. Chidambaram Stadium, Chennai",
      isHome: false,
    },
    {
      id: "match4",
      opponent: "DC",
      date: "Apr 22, 2025",
      time: "7:30 PM",
      venue: "M. Chinnaswamy Stadium, Bangalore",
      isHome: true,
    },
  ],
  // Add more teams as needed
}

export default function TeamDetailsPage() {
  const params = useParams()
  const teamId = params.id as string
  const [team, setTeam] = useState<any>(null)
  const [players, setPlayers] = useState<any[]>([])
  const [matches, setMatches] = useState<any[]>([])

  useEffect(() => {
    // In a real application, you would fetch this data from an API
    if (teamId && teamData[teamId as keyof typeof teamData]) {
      setTeam(teamData[teamId as keyof typeof teamData])
      setPlayers(playersData[teamId as keyof typeof playersData] || [])
      setMatches(upcomingMatches[teamId as keyof typeof upcomingMatches] || [])
    }
  }, [teamId])

  if (!team) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading team details...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/teams">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Teams
            </Link>
          </Button>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <div
                className="w-48 h-48 rounded-full p-2 flex items-center justify-center mb-4"
                style={{ backgroundColor: team.primaryColor }}
              >
                <img src={team.logo || "/placeholder.svg"} alt={team.name} className="w-40 h-40 object-contain" />
              </div>
              <div
                className="px-4 py-1 rounded-full text-lg font-bold mb-2"
                style={{
                  backgroundColor: team.primaryColor,
                  color: team.secondaryColor === "#000000" ? "#FFFFFF" : team.secondaryColor,
                }}
              >
                {team.shortName}
              </div>
              <div className="flex items-center mt-2">
                <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
                <span className="font-medium">{team.championships} Championships</span>
              </div>
            </motion.div>

            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{team.name}</h1>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{team.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Captain:</span>
                    <span className="font-medium">{team.captain}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Coach:</span>
                    <span className="font-medium">{team.coach}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Home Ground:</span>
                    <span className="font-medium">{team.homeGround}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Owner:</span>
                    <span className="font-medium">{team.owner}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Founded:</span>
                    <span className="font-medium">{team.founded}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Current Record:</span>
                    <span className="font-medium">
                      <span className="text-green-600 dark:text-green-400">{team.wins}W</span>
                      {" - "}
                      <span className="text-red-600 dark:text-red-400">{team.losses}L</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button>Team Website</Button>
                <Button variant="outline">Follow Team</Button>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="squad" className="mt-10">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="squad">Squad</TabsTrigger>
            <TabsTrigger value="matches">Upcoming Matches</TabsTrigger>
            <TabsTrigger value="stats">Team Stats</TabsTrigger>
          </TabsList>

          <TabsContent value="squad" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Team Squad</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Player</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Country</TableHead>
                        <TableHead className="text-right">Matches</TableHead>
                        <TableHead className="text-right">Runs</TableHead>
                        <TableHead className="text-right">Avg</TableHead>
                        <TableHead className="text-right">SR</TableHead>
                        <TableHead className="text-right">Wickets</TableHead>
                        <TableHead className="text-right">Economy</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {players.map((player, index) => (
                        <motion.tr
                          key={player.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          <TableCell>
                            <div className="flex items-center">
                              <Avatar className="h-8 w-8 mr-2">
                                <AvatarImage src={player.avatar || "/placeholder.svg"} alt={player.name} />
                                <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{player.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{player.role}</TableCell>
                          <TableCell>{player.country}</TableCell>
                          <TableCell className="text-right">{player.matches}</TableCell>
                          <TableCell className="text-right">{player.runs}</TableCell>
                          <TableCell className="text-right">{player.average}</TableCell>
                          <TableCell className="text-right">{player.strikeRate}</TableCell>
                          <TableCell className="text-right">{player.wickets}</TableCell>
                          <TableCell className="text-right">{player.economy}</TableCell>
                        </motion.tr>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="matches" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Matches</CardTitle>
              </CardHeader>
              <CardContent>
                {matches.length > 0 ? (
                  <div className="grid gap-6">
                    {matches.map((match, index) => (
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
                                    src={team.logo || "/placeholder.svg"}
                                    alt={team.shortName}
                                    className="w-16 h-16 mb-2"
                                  />
                                  <span className="font-bold text-lg">{team.shortName}</span>
                                </div>

                                <div className="flex flex-col items-center mx-6">
                                  <span className="text-xl font-bold mb-2">VS</span>
                                  <div className="bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full text-sm">
                                    {match.isHome ? "Home" : "Away"}
                                  </div>
                                </div>

                                <div className="flex flex-col items-center ml-6">
                                  <img
                                    src="/placeholder.svg?height=64&width=64"
                                    alt={match.opponent}
                                    className="w-16 h-16 mb-2"
                                  />
                                  <span className="font-bold text-lg">{match.opponent}</span>
                                </div>
                              </div>

                              <div className="flex flex-col items-start md:items-end">
                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-1">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  <span>
                                    {match.date}, {match.time}
                                  </span>
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
                    <h3 className="text-xl font-medium mb-2">No upcoming matches</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      There are no upcoming matches scheduled for this team at the moment.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Team Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Batting Performance</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>Total Runs</span>
                          <span className="font-medium">8,745</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "85%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>Average</span>
                          <span className="font-medium">156.8</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "78%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>Strike Rate</span>
                          <span className="font-medium">9.2</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "92%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>Boundaries</span>
                          <span className="font-medium">742</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "80%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Bowling Performance</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>Total Wickets</span>
                          <span className="font-medium">124</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                          <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "75%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>Economy</span>
                          <span className="font-medium">7.8</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                          <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "82%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>Dot Balls</span>
                          <span className="font-medium">412</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                          <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "68%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>Maidens</span>
                          <span className="font-medium">8</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                          <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "45%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">Season Performance</h3>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Season</TableHead>
                          <TableHead className="text-right">Matches</TableHead>
                          <TableHead className="text-right">Won</TableHead>
                          <TableHead className="text-right">Lost</TableHead>
                          <TableHead className="text-right">NR</TableHead>
                          <TableHead className="text-right">Position</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>2024</TableCell>
                          <TableCell className="text-right">14</TableCell>
                          <TableCell className="text-right">9</TableCell>
                          <TableCell className="text-right">5</TableCell>
                          <TableCell className="text-right">0</TableCell>
                          <TableCell className="text-right">2nd</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>2023</TableCell>
                          <TableCell className="text-right">14</TableCell>
                          <TableCell className="text-right">8</TableCell>
                          <TableCell className="text-right">6</TableCell>
                          <TableCell className="text-right">0</TableCell>
                          <TableCell className="text-right">3rd</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>2022</TableCell>
                          <TableCell className="text-right">14</TableCell>
                          <TableCell className="text-right">10</TableCell>
                          <TableCell className="text-right">4</TableCell>
                          <TableCell className="text-right">0</TableCell>
                          <TableCell className="text-right">1st</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>2021</TableCell>
                          <TableCell className="text-right">14</TableCell>
                          <TableCell className="text-right">7</TableCell>
                          <TableCell className="text-right">7</TableCell>
                          <TableCell className="text-right">0</TableCell>
                          <TableCell className="text-right">4th</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>2020</TableCell>
                          <TableCell className="text-right">14</TableCell>
                          <TableCell className="text-right">6</TableCell>
                          <TableCell className="text-right">8</TableCell>
                          <TableCell className="text-right">0</TableCell>
                          <TableCell className="text-right">5th</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

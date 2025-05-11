"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function StatsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [teamFilter, setTeamFilter] = useState("all")

  const batsmen = [
    {
      name: "Virat Kohli",
      team: "RCB",
      matches: 7,
      runs: 425,
      average: 60.71,
      strikeRate: 148.2,
      fifties: 3,
      hundreds: 1,
      fours: 38,
      sixes: 19,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "KL Rahul",
      team: "LSG",
      matches: 7,
      runs: 387,
      average: 55.29,
      strikeRate: 139.5,
      fifties: 4,
      hundreds: 0,
      fours: 35,
      sixes: 16,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Shubman Gill",
      team: "GT",
      matches: 7,
      runs: 356,
      average: 50.86,
      strikeRate: 142.8,
      fifties: 3,
      hundreds: 0,
      fours: 32,
      sixes: 14,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Jos Buttler",
      team: "RR",
      matches: 7,
      runs: 325,
      average: 46.43,
      strikeRate: 155.3,
      fifties: 2,
      hundreds: 1,
      fours: 28,
      sixes: 21,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Faf du Plessis",
      team: "RCB",
      matches: 7,
      runs: 312,
      average: 44.57,
      strikeRate: 152.2,
      fifties: 3,
      hundreds: 0,
      fours: 30,
      sixes: 15,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Suryakumar Yadav",
      team: "MI",
      matches: 6,
      runs: 298,
      average: 49.67,
      strikeRate: 168.4,
      fifties: 2,
      hundreds: 0,
      fours: 25,
      sixes: 20,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Ruturaj Gaikwad",
      team: "CSK",
      matches: 7,
      runs: 287,
      average: 41.0,
      strikeRate: 136.7,
      fifties: 2,
      hundreds: 0,
      fours: 31,
      sixes: 10,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const bowlers = [
    {
      name: "Jasprit Bumrah",
      team: "MI",
      matches: 7,
      wickets: 15,
      economy: 6.8,
      average: 14.2,
      bestFigures: "4/20",
      fourWickets: 1,
      fiveWickets: 0,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Yuzvendra Chahal",
      team: "RR",
      matches: 7,
      wickets: 14,
      economy: 7.2,
      average: 15.8,
      bestFigures: "4/25",
      fourWickets: 1,
      fiveWickets: 0,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "T Natarajan",
      team: "SRH",
      matches: 7,
      wickets: 13,
      economy: 8.1,
      average: 18.2,
      bestFigures: "3/18",
      fourWickets: 0,
      fiveWickets: 0,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Rashid Khan",
      team: "GT",
      matches: 7,
      wickets: 12,
      economy: 6.5,
      average: 16.4,
      bestFigures: "3/14",
      fourWickets: 0,
      fiveWickets: 0,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Harshal Patel",
      team: "RCB",
      matches: 7,
      wickets: 11,
      economy: 8.4,
      average: 19.6,
      bestFigures: "3/28",
      fourWickets: 0,
      fiveWickets: 0,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Kagiso Rabada",
      team: "PBKS",
      matches: 7,
      wickets: 10,
      economy: 7.8,
      average: 20.1,
      bestFigures: "3/21",
      fourWickets: 0,
      fiveWickets: 0,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Ravindra Jadeja",
      team: "CSK",
      matches: 7,
      wickets: 9,
      economy: 7.2,
      average: 22.4,
      bestFigures: "3/22",
      fourWickets: 0,
      fiveWickets: 0,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const allRounders = [
    {
      name: "Hardik Pandya",
      team: "GT",
      matches: 7,
      runs: 210,
      strikeRate: 145.8,
      wickets: 8,
      economy: 8.2,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Andre Russell",
      team: "KKR",
      matches: 7,
      runs: 185,
      strikeRate: 178.6,
      wickets: 7,
      economy: 9.1,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Ravindra Jadeja",
      team: "CSK",
      matches: 7,
      runs: 165,
      strikeRate: 132.0,
      wickets: 9,
      economy: 7.2,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Marcus Stoinis",
      team: "LSG",
      matches: 6,
      runs: 148,
      strikeRate: 156.8,
      wickets: 5,
      economy: 8.7,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Axar Patel",
      team: "DC",
      matches: 7,
      runs: 132,
      strikeRate: 128.2,
      wickets: 6,
      economy: 7.5,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

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

  const filterPlayers = (players) => {
    return players.filter(
      (player) =>
        (teamFilter === "all" || player.team === teamFilter) &&
        (player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          player.team.toLowerCase().includes(searchTerm.toLowerCase())),
    )
  }

  const filteredBatsmen = filterPlayers(batsmen)
  const filteredBowlers = filterPlayers(bowlers)
  const filteredAllRounders = filterPlayers(allRounders)

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Player Statistics</h1>
            <p className="text-gray-500 dark:text-gray-400">Comprehensive stats for all IPL 2025 players</p>
          </div>

          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search players..."
                className="pl-10 bg-white dark:bg-gray-800"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full sm:w-48">
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
        </div>

        <Tabs defaultValue="batting" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="batting">Batting Stats</TabsTrigger>
            <TabsTrigger value="bowling">Bowling Stats</TabsTrigger>
            <TabsTrigger value="allrounders">All-Rounders</TabsTrigger>
          </TabsList>

          <TabsContent value="batting">
            <Card>
              <CardHeader>
                <CardTitle>Batting Leaderboard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">#</TableHead>
                        <TableHead>Player</TableHead>
                        <TableHead>Team</TableHead>
                        <TableHead className="text-right">M</TableHead>
                        <TableHead className="text-right">Runs</TableHead>
                        <TableHead className="text-right">Avg</TableHead>
                        <TableHead className="text-right">SR</TableHead>
                        <TableHead className="text-right">50s</TableHead>
                        <TableHead className="text-right">100s</TableHead>
                        <TableHead className="text-right">4s</TableHead>
                        <TableHead className="text-right">6s</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBatsmen.map((player, index) => (
                        <motion.tr
                          key={player.name}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          <TableCell className="font-medium">{index + 1}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Avatar className="h-8 w-8 mr-2">
                                <AvatarImage src={player.avatar} alt={player.name} />
                                <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span>{player.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{player.team}</TableCell>
                          <TableCell className="text-right">{player.matches}</TableCell>
                          <TableCell className="text-right font-bold">{player.runs}</TableCell>
                          <TableCell className="text-right">{player.average}</TableCell>
                          <TableCell className="text-right">{player.strikeRate}</TableCell>
                          <TableCell className="text-right">{player.fifties}</TableCell>
                          <TableCell className="text-right">{player.hundreds}</TableCell>
                          <TableCell className="text-right">{player.fours}</TableCell>
                          <TableCell className="text-right">{player.sixes}</TableCell>
                        </motion.tr>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bowling">
            <Card>
              <CardHeader>
                <CardTitle>Bowling Leaderboard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">#</TableHead>
                        <TableHead>Player</TableHead>
                        <TableHead>Team</TableHead>
                        <TableHead className="text-right">M</TableHead>
                        <TableHead className="text-right">Wkts</TableHead>
                        <TableHead className="text-right">Econ</TableHead>
                        <TableHead className="text-right">Avg</TableHead>
                        <TableHead className="text-right">Best</TableHead>
                        <TableHead className="text-right">4W</TableHead>
                        <TableHead className="text-right">5W</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBowlers.map((player, index) => (
                        <motion.tr
                          key={player.name}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          <TableCell className="font-medium">{index + 1}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Avatar className="h-8 w-8 mr-2">
                                <AvatarImage src={player.avatar} alt={player.name} />
                                <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span>{player.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{player.team}</TableCell>
                          <TableCell className="text-right">{player.matches}</TableCell>
                          <TableCell className="text-right font-bold">{player.wickets}</TableCell>
                          <TableCell className="text-right">{player.economy}</TableCell>
                          <TableCell className="text-right">{player.average}</TableCell>
                          <TableCell className="text-right">{player.bestFigures}</TableCell>
                          <TableCell className="text-right">{player.fourWickets}</TableCell>
                          <TableCell className="text-right">{player.fiveWickets}</TableCell>
                        </motion.tr>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="allrounders">
            <Card>
              <CardHeader>
                <CardTitle>All-Rounders Leaderboard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">#</TableHead>
                        <TableHead>Player</TableHead>
                        <TableHead>Team</TableHead>
                        <TableHead className="text-right">M</TableHead>
                        <TableHead className="text-right">Runs</TableHead>
                        <TableHead className="text-right">SR</TableHead>
                        <TableHead className="text-right">Wkts</TableHead>
                        <TableHead className="text-right">Econ</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAllRounders.map((player, index) => (
                        <motion.tr
                          key={player.name}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          <TableCell className="font-medium">{index + 1}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Avatar className="h-8 w-8 mr-2">
                                <AvatarImage src={player.avatar} alt={player.name} />
                                <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span>{player.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{player.team}</TableCell>
                          <TableCell className="text-right">{player.matches}</TableCell>
                          <TableCell className="text-right">{player.runs}</TableCell>
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
        </Tabs>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Bell, ChevronRight, Menu, Search, Trophy, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LiveScoreCard } from "@/components/live-score-card"
import { PointsTable } from "@/components/points-table"
import { TeamCard } from "@/components/team-card"
import { UpcomingMatch } from "@/components/upcoming-match"
import { TopPerformers } from "@/components/top-performers"
import { NewsCard } from "@/components/news-card"
import { FeaturedMatch } from "@/components/featured-match"

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="flex items-center"
              >
                <Trophy className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                <span className="ml-2 text-xl font-bold text-blue-600 dark:text-blue-400">IPL Dashboard</span>
              </motion.div>
              <nav className="hidden md:flex ml-10 space-x-8">
                <Link href="/" className="text-blue-600 dark:text-blue-400 font-medium">
                  Home
                </Link>
                <Link
                  href="/teams"
                  className="text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Teams
                </Link>
                <Link
                  href="/schedule"
                  className="text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Schedule
                </Link>
                <Link
                  href="/stats"
                  className="text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Stats
                </Link>
                <Link
                  href="/tickets"
                  className="text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Tickets
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-10 w-64 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-blue-500"
                />
              </div>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </Button>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/login">Login</Link>
                </Button>
              </div>
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white dark:bg-gray-900 shadow-lg"
        >
          <div className="px-4 py-2 space-y-1">
            <Link
              href="/"
              className="block px-3 py-2 text-blue-600 dark:text-blue-400 font-medium rounded-md bg-blue-50 dark:bg-blue-900/20"
            >
              Home
            </Link>
            <Link
              href="/teams"
              className="block px-3 py-2 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
            >
              Teams
            </Link>
            <Link
              href="/schedule"
              className="block px-3 py-2 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
            >
              Schedule
            </Link>
            <Link
              href="/stats"
              className="block px-3 py-2 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
            >
              Stats
            </Link>
            <Link
              href="/tickets"
              className="block px-3 py-2 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
            >
              Tickets
            </Link>
            <div className="relative mt-3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-10 w-full bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Live Score Ticker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <LiveScoreCard />
        </motion.div>

        {/* Featured Match */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <FeaturedMatch />
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Matches */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-xl font-bold">Upcoming Matches</CardTitle>
                  <Button variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400">
                    View All <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <UpcomingMatch
                      team1="CSK"
                      team2="MI"
                      date="Apr 12, 2025"
                      time="7:30 PM"
                      venue="Wankhede Stadium, Mumbai"
                      team1Logo="/placeholder.svg?height=40&width=40"
                      team2Logo="/placeholder.svg?height=40&width=40"
                    >
                      <Button size="sm" variant="outline" className="text-xs" asChild>
                        <Link href={`/tickets?match=match1`}>Book Tickets</Link>
                      </Button>
                    </UpcomingMatch>
                    <UpcomingMatch
                      team1="RCB"
                      team2="KKR"
                      date="Apr 14, 2025"
                      time="7:30 PM"
                      venue="M. Chinnaswamy Stadium, Bangalore"
                      team1Logo="/placeholder.svg?height=40&width=40"
                      team2Logo="/placeholder.svg?height=40&width=40"
                    >
                      <Button size="sm" variant="outline" className="text-xs" asChild>
                        <Link href={`/tickets?match=match2`}>Book Tickets</Link>
                      </Button>
                    </UpcomingMatch>
                    <UpcomingMatch
                      team1="DC"
                      team2="PBKS"
                      date="Apr 16, 2025"
                      time="3:30 PM"
                      venue="Arun Jaitley Stadium, Delhi"
                      team1Logo="/placeholder.svg?height=40&width=40"
                      team2Logo="/placeholder.svg?height=40&width=40"
                    >
                      <Button size="sm" variant="outline" className="text-xs" asChild>
                        <Link href={`/tickets?match=match3`}>Book Tickets</Link>
                      </Button>
                    </UpcomingMatch>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Teams Section */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-xl font-bold">IPL Teams</CardTitle>
                  <Button variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400">
                    View All <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    <TeamCard name="CSK" logo="/placeholder.svg?height=60&width=60" wins={5} losses={2} />
                    <TeamCard name="MI" logo="/placeholder.svg?height=60&width=60" wins={4} losses={3} />
                    <TeamCard name="RCB" logo="/placeholder.svg?height=60&width=60" wins={3} losses={4} />
                    <TeamCard name="KKR" logo="/placeholder.svg?height=60&width=60" wins={6} losses={1} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* News & Updates */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-xl font-bold">Latest News & Updates</CardTitle>
                  <Button variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400">
                    View All <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <NewsCard
                      title="Virat Kohli scores century against Mumbai Indians"
                      image="/placeholder.svg?height=100&width=180"
                      date="Apr 10, 2025"
                      excerpt="Royal Challengers Bangalore's star batsman Virat Kohli scored a magnificent century against Mumbai Indians..."
                      likes={245}
                    />
                    <NewsCard
                      title="MS Dhoni announces his final IPL season"
                      image="/placeholder.svg?height=100&width=180"
                      date="Apr 8, 2025"
                      excerpt="Chennai Super Kings captain MS Dhoni has announced that this IPL season will be his last as a player..."
                      likes={512}
                    />
                    <NewsCard
                      title="Jasprit Bumrah takes 5 wickets against Delhi Capitals"
                      image="/placeholder.svg?height=100&width=180"
                      date="Apr 6, 2025"
                      excerpt="Mumbai Indians' pace spearhead Jasprit Bumrah delivered a match-winning performance with 5 wickets..."
                      likes={189}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Points Table */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-bold">IPL Points Table</CardTitle>
                </CardHeader>
                <CardContent>
                  <PointsTable />
                </CardContent>
              </Card>
            </motion.div>

            {/* Top Performers */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Card>
                <Tabs defaultValue="batsmen">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl font-bold">Top Performers</CardTitle>
                      <TabsList>
                        <TabsTrigger value="batsmen">Batting</TabsTrigger>
                        <TabsTrigger value="bowlers">Bowling</TabsTrigger>
                      </TabsList>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <TabsContent value="batsmen" className="mt-0">
                      <TopPerformers type="batting" />
                    </TabsContent>
                    <TabsContent value="bowlers" className="mt-0">
                      <TopPerformers type="bowling" />
                    </TabsContent>
                  </CardContent>
                </Tabs>
              </Card>
            </motion.div>

            {/* Fan Poll */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-bold">Fan Poll</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="font-medium">Who will win tonight's match?</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>Chennai Super Kings</span>
                        <span>62%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: "62%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>Mumbai Indians</span>
                        <span>38%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: "38%" }}></div>
                      </div>
                    </div>
                    <div className="pt-2">
                      <Button className="w-full">Vote Now</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">IPL Dashboard</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                The ultimate destination for IPL fans to track live scores, team standings, player stats, and more.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/"
                    className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/teams"
                    className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Teams
                  </Link>
                </li>
                <li>
                  <Link
                    href="/schedule"
                    className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Schedule
                  </Link>
                </li>
                <li>
                  <Link
                    href="/stats"
                    className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Stats
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    News
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Videos
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Photos
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Fantasy League
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                <Link
                  href="#"
                  className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                </Link>
              </div>
              <div className="mt-4">
                <h4 className="font-bold mb-2">Download App</h4>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex items-center">
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.9 19.9l-3.2-3.2c-1.4.9-3 1.4-4.7 1.4-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8c0 1.7-.5 3.3-1.4 4.7l3.2 3.2c.6.6.6 1.5 0 2.1-.6.6-1.5.6-2.1 0zm-8-5c3.3 0 6-2.7 6-6s-2.7-6-6-6-6 2.7-6 6 2.7 6 6 6z" />
                    </svg>
                    iOS
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center">
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.9 19.9l-3.2-3.2c-1.4.9-3 1.4-4.7 1.4-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8c0 1.7-.5 3.3-1.4 4.7l3.2 3.2c.6.6.6 1.5 0 2.1-.6.6-1.5.6-2.1 0zm-8-5c3.3 0 6-2.7 6-6s-2.7-6-6-6-6 2.7-6 6 2.7 6 6 6z" />
                    </svg>
                    Android
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>&copy; {new Date().getFullYear()} IPL Dashboard. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

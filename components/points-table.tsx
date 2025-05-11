"use client"

import { motion } from "framer-motion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const teams = [
  {
    name: "KKR",
    matches: 7,
    won: 6,
    lost: 1,
    nrr: "+1.253",
    points: 12,
    logo: "/placeholder.svg?height=24&width=24",
  },
  {
    name: "CSK",
    matches: 7,
    won: 5,
    lost: 2,
    nrr: "+0.726",
    points: 10,
    logo: "/placeholder.svg?height=24&width=24",
  },
  {
    name: "MI",
    matches: 7,
    won: 4,
    lost: 3,
    nrr: "+0.457",
    points: 8,
    logo: "/placeholder.svg?height=24&width=24",
  },
  {
    name: "RCB",
    matches: 7,
    won: 3,
    lost: 4,
    nrr: "-0.125",
    points: 6,
    logo: "/placeholder.svg?height=24&width=24",
  },
  {
    name: "DC",
    matches: 7,
    won: 2,
    lost: 5,
    nrr: "-0.568",
    points: 4,
    logo: "/placeholder.svg?height=24&width=24",
  },
]

export function PointsTable() {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">#</TableHead>
            <TableHead>Team</TableHead>
            <TableHead className="text-center">M</TableHead>
            <TableHead className="text-center">W</TableHead>
            <TableHead className="text-center">L</TableHead>
            <TableHead className="text-center">NRR</TableHead>
            <TableHead className="text-center">Pts</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teams.map((team, index) => (
            <motion.tr
              key={team.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <img src={team.logo || "/placeholder.svg"} alt={team.name} className="w-6 h-6 mr-2" />
                  <span>{team.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-center">{team.matches}</TableCell>
              <TableCell className="text-center">{team.won}</TableCell>
              <TableCell className="text-center">{team.lost}</TableCell>
              <TableCell
                className={`text-center ${team.nrr.startsWith("+") ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
              >
                {team.nrr}
              </TableCell>
              <TableCell className="text-center font-bold">{team.points}</TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface TopPerformersProps {
  type: "batting" | "bowling"
}

const batsmen = [
  {
    name: "Virat Kohli",
    team: "RCB",
    runs: 425,
    strikeRate: 148.2,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "KL Rahul",
    team: "LSG",
    runs: 387,
    strikeRate: 139.5,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Shubman Gill",
    team: "GT",
    runs: 356,
    strikeRate: 142.8,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Jos Buttler",
    team: "RR",
    runs: 325,
    strikeRate: 155.3,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const bowlers = [
  {
    name: "Jasprit Bumrah",
    team: "MI",
    wickets: 15,
    economy: 6.8,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Yuzvendra Chahal",
    team: "RR",
    wickets: 14,
    economy: 7.2,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "T Natarajan",
    team: "SRH",
    wickets: 13,
    economy: 8.1,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Rashid Khan",
    team: "GT",
    wickets: 12,
    economy: 6.5,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function TopPerformers({ type }: TopPerformersProps) {
  const performers = type === "batting" ? batsmen : bowlers

  return (
    <div className="space-y-4">
      {performers.map((performer, index) => (
        <motion.div
          key={performer.name}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src={performer.avatar} alt={performer.name} />
              <AvatarFallback>{performer.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{performer.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{performer.team}</p>
            </div>
          </div>
          <div className="text-right">
            {type === "batting" ? (
              <>
                <p className="font-bold">{performer.runs} runs</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">SR: {performer.strikeRate}</p>
              </>
            ) : (
              <>
                <p className="font-bold">{performer.wickets} wickets</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Eco: {performer.economy}</p>
              </>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

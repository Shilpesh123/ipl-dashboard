"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function LiveScoreCard() {
  const [scores, setScores] = useState([
    {
      id: 1,
      team1: "CSK",
      team2: "MI",
      team1Score: "189/4",
      team2Score: "145/7",
      overs: "17.3/20",
      status: "CSK needs 45 runs in 15 balls",
      isLive: true,
    },
    {
      id: 2,
      team1: "RCB",
      team2: "KKR",
      team1Score: "204/5",
      team2Score: "156/8",
      overs: "20/20",
      status: "RCB won by 48 runs",
      isLive: false,
    },
  ])

  // Simulate live score updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (scores[0].isLive) {
        setScores((prev) => {
          const newScores = [...prev]
          const runs = Math.floor(Math.random() * 3)
          const wickets = Math.random() > 0.95 ? 1 : 0

          const [currentRuns, currentWickets] = newScores[0].team1Score.split("/").map(Number)
          const newRuns = currentRuns + runs
          const newWickets = currentWickets + wickets

          const [currentOvers, totalOvers] = newScores[0].overs.split("/").map(String)
          const [overNumber, ballNumber] = currentOvers.split(".").map(Number)

          let newOverNumber = overNumber
          let newBallNumber = ballNumber + 1

          if (newBallNumber >= 6) {
            newOverNumber += 1
            newBallNumber = 0
          }

          const newOvers = `${newOverNumber}.${newBallNumber}/${totalOvers}`
          const runsNeeded = 190 - newRuns
          const ballsLeft = (20 - newOverNumber) * 6 - newBallNumber

          newScores[0] = {
            ...newScores[0],
            team1Score: `${newRuns}/${newWickets}`,
            overs: newOvers,
            status: `CSK needs ${runsNeeded} runs in ${ballsLeft} balls`,
          }

          return newScores
        })
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [scores])

  return (
    <div className="overflow-hidden">
      <motion.div
        animate={{ x: ["100%", "-100%"] }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 20,
          ease: "linear",
        }}
        className="flex whitespace-nowrap"
      >
        {[...scores, ...scores].map((score, index) => (
          <Card
            key={`${score.id}-${index}`}
            className="inline-flex items-center px-4 py-2 mr-4 bg-white dark:bg-gray-800 shadow-md"
          >
            <div className="flex items-center">
              <div className="flex items-center mr-3">
                <span className="font-bold text-sm mr-1">{score.team1}</span>
                <span className="text-sm">{score.team1Score}</span>
              </div>
              <span className="text-xs text-gray-500 mx-1">vs</span>
              <div className="flex items-center ml-3">
                <span className="font-bold text-sm mr-1">{score.team2}</span>
                <span className="text-sm">{score.team2Score}</span>
              </div>
              <span className="mx-3 text-xs text-gray-500">({score.overs})</span>
              <span className="text-xs">{score.status}</span>
              {score.isLive && (
                <Badge variant="destructive" className="ml-3 animate-pulse">
                  LIVE
                </Badge>
              )}
            </div>
          </Card>
        ))}
      </motion.div>
    </div>
  )
}

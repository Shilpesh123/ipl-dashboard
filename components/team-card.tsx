"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

interface TeamCardProps {
  name: string
  logo: string
  wins: number
  losses: number
}

export function TeamCard({ name, logo, wins, losses }: TeamCardProps) {
  return (
    <Link href={`/teams/${name.toLowerCase()}`}>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="cursor-pointer">
        <Card className="overflow-hidden border-2 hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
          <CardContent className="p-4 flex flex-col items-center">
            <motion.img
              src={logo}
              alt={name}
              className="w-16 h-16 mb-2"
              initial={{ rotate: 0 }}
              whileHover={{ rotate: 10 }}
            />
            <h3 className="font-bold text-lg">{name}</h3>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              <span className="text-green-600 dark:text-green-400">{wins}W</span>
              {" - "}
              <span className="text-red-600 dark:text-red-400">{losses}L</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  )
}

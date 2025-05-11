"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Share2 } from "lucide-react"
import { useState } from "react"

interface NewsCardProps {
  title: string
  image: string
  date: string
  excerpt: string
  likes: number
}

export function NewsCard({ title, image, date, excerpt, likes }: NewsCardProps) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(likes)

  const handleLike = () => {
    if (liked) {
      setLikeCount((prev) => prev - 1)
    } else {
      setLikeCount((prev) => prev + 1)
    }
    setLiked(!liked)
  }

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          <div className="sm:w-1/3 h-full">
            <img
              src={image || "/placeholder.svg"}
              alt={title}
              className="w-full h-full object-cover"
              style={{ minHeight: "100px" }}
            />
          </div>
          <div className="sm:w-2/3 p-4">
            <h3 className="font-bold text-lg mb-1 line-clamp-2">{title}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{date}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">{excerpt}</p>
            <div className="flex items-center justify-between">
              <Button variant="link" className="p-0 h-auto text-blue-600 dark:text-blue-400">
                Read More
              </Button>
              <div className="flex items-center space-x-2">
                <motion.button
                  whileTap={{ scale: 1.2 }}
                  onClick={handleLike}
                  className="flex items-center text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                >
                  <Heart
                    className={`h-4 w-4 mr-1 ${liked ? "fill-red-500 text-red-500 dark:fill-red-400 dark:text-red-400" : ""}`}
                  />
                  <span className="text-xs">{likeCount}</span>
                </motion.button>
                <button className="flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">
                  <Share2 className="h-4 w-4 mr-1" />
                  <span className="text-xs">Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

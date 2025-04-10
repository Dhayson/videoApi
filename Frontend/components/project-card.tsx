"use client"

import { useEffect, useState } from "react"
import { MoreHorizontal, Bell } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import clsx from "clsx"
import { VideoWithFeedback } from "./video-with-feedback"

interface ProjectCardProps {
  title: string
  notifications: number
  engagementRate: number
  videoSrc: string
  feedbacks: any
  className?: string
}

export function ProjectCard({
  title,
  notifications,
  engagementRate,
  videoSrc,
  feedbacks,
  className,
}: ProjectCardProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <Card className={clsx("flex flex-col h-full", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Bell className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col justify-between">
        <div className="flex-1 rounded-md overflow-hidden mb-2">
          {isClient && (
            <VideoWithFeedback src={videoSrc} feedbacks={feedbacks}/>
          )}
        </div>

        <div className="flex justify-between items-center text-xs text-gray-500 mt-auto">
          <div className="flex items-center">
            <Bell className="h-3 w-3 mr-1" />
            <span>{notifications} notificações</span>
          </div>
          <div>
            <span>Taxa de aprovação: {engagementRate}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

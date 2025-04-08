"use client"

import { useEffect, useState } from "react"
import { MoreHorizontal, Bell } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import clsx from "clsx"

interface ProjectCardProps {
  title: string
  notifications: number
  engagementRate: number
  videoSrc: string
  className?: string
}

export function ProjectCard({
  title,
  notifications,
  engagementRate,
  videoSrc,
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
        <div className="flex-1 rounded-md overflow-hidden bg-black mb-2">
          {isClient && (
            <video
              src={videoSrc}
              controls
              preload="metadata"
              className="w-full h-full object-cover"
            >
              Seu navegador não suporta vídeos.
            </video>
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

"use client"

import { useEffect, useRef, useState } from "react"

type Feedback = {
  id: number
  timestamp: number
  message: string
}

export function VideoWithFeedback({ src, feedbacks }: { src: string; feedbacks: Feedback[] }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [activeFeedbacks, setActiveFeedbacks] = useState<Feedback[]>([])
  const duration = 5 // Duration in seconds to show feedback

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      const currentTime = video.currentTime

      const visibles = feedbacks.filter(
        (f) =>
          currentTime >= f.timestamp &&
          (!duration || currentTime <= f.timestamp + duration)
      )
      setActiveFeedbacks(visibles)
    }

    video.addEventListener("timeupdate", handleTimeUpdate)
    return () => video.removeEventListener("timeupdate", handleTimeUpdate)
  }, [feedbacks])

  return (
    <div className="relative w-full aspect-video bg-black rounded-md overflow-hidden">
      <video ref={videoRef} src={src} controls className="w-full h-full object-cover" />

      {activeFeedbacks.map((f) => (
        <div
          key={f.id}
          className="absolute bg-white shadow-lg rounded px-3 py-2 text-sm text-black border border-gray-200"
          style={{
            top: "80%",
            left: "10%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {f.message}
        </div>
      ))}
    </div>
  )
}

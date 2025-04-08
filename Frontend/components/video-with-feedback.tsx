"use client"

import { useEffect, useState, forwardRef, useImperativeHandle, useRef} from "react"

type Feedback = {
  id: number
  timestamp: number
  message: string
}

type Props = {
  src: string
  feedbacks: Feedback[]
}

export const VideoWithFeedback = forwardRef<HTMLVideoElement, Props>(({ src, feedbacks }, ref) => {
  const [activeFeedbacks, setActiveFeedbacks] = useState<Feedback[]>([])
  const duration = 5 // Duration in seconds to show feedback

  const internalRef = useRef<HTMLVideoElement>(null)

  // Permite que o ref externo controle o video
  useImperativeHandle(ref, () => internalRef.current as HTMLVideoElement)

  useEffect(() => {
    const video = internalRef.current
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
      <video ref={internalRef} src={src} controls className="w-full h-full object-cover" />

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
})

VideoWithFeedback.displayName = "VideoWithFeedback"

'use client'
import { useEffect, useRef } from 'react'

export interface Point3D {
  x: number
  y: number
  z: number
}

export interface Point2D {
  x: number
  y: number
}

export interface ArtData {
  vs: Point3D[]
  fs: number[][]
}

interface ArtCanvasProps {
  artData: () => ArtData
  width?: number
  height?: number
  horizontalSpeed?: number
  verticalSpeed?: number
  color?: string
  className?: string
}

const ArtCanvas = ({
  artData,
  width = 400,
  height = 400,
  horizontalSpeed = 0.02,
  verticalSpeed = 0,
  color = '#50FF50',
  className = '',
}: ArtCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const horizontalSpeedRef = useRef(horizontalSpeed)
  const verticalSpeedRef = useRef(verticalSpeed)
  const colorRef = useRef(color)

  useEffect(() => {
    horizontalSpeedRef.current = horizontalSpeed
  }, [horizontalSpeed])

  useEffect(() => {
    verticalSpeedRef.current = verticalSpeed
  }, [verticalSpeed])

  useEffect(() => {
    colorRef.current = color
  }, [color])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')

    if (!ctx) return

    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'

    const { vs, fs } = artData()
    let horizontalAngle = 0
    let verticalAngle = 0
    let animationFrameId: number

    const BACKGROUND = '#101010'

    const project = ({ x, y, z }: Point3D): Point2D => {
      const safeZ = Math.max(z, 0.001)
      return {
        x: x / safeZ,
        y: y / safeZ,
      }
    }

    const translateZ = ({ x, y, z }: Point3D, dz: number): Point3D => ({
      x,
      y,
      z: z + dz,
    })

    const rotateAroundY = ({ x, y, z }: Point3D, angle: number): Point3D => {
      const c = Math.cos(angle)
      const s = Math.sin(angle)
      return { x: x * c - z * s, y, z: x * s + z * c }
    }

    const rotateAroundX = ({ x, y, z }: Point3D, angle: number): Point3D => {
      const c = Math.cos(angle)
      const s = Math.sin(angle)
      return { x, y: y * c - z * s, z: y * s + z * c }
    }

    const toScreenCoords = (p: Point2D): Point2D => ({
      x: ((p.x + 1) / 2) * canvas.width,
      y: (1 - (p.y + 1) / 2) * canvas.height,
    })

    const draw = () => {
      horizontalAngle += horizontalSpeedRef.current
      verticalAngle += verticalSpeedRef.current
      ctx.fillStyle = BACKGROUND
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.lineWidth = 2
      ctx.strokeStyle = colorRef.current

      fs.forEach((f) => {
        ctx.beginPath()
        for (let i = 0; i < f.length; i++) {
          const pRaw = vs[f[i]]
          if (!pRaw) continue

          const pHorizontal = rotateAroundY(pRaw, horizontalAngle)
          const pVertical = rotateAroundX(pHorizontal, verticalAngle)
          const pTranslated = translateZ(pVertical, 1)
          const pScreen = toScreenCoords(project(pTranslated))

          if (i === 0) ctx.moveTo(pScreen.x, pScreen.y)
          else ctx.lineTo(pScreen.x, pScreen.y)
        }
        if (f.length > 2) {
          ctx.closePath()
        }
        ctx.stroke()
      })

      animationFrameId = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(animationFrameId)
  }, [artData])

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={`rounded-lg shadow-2xl bg-[#101010] ${className}`}
    />
  )
}

export default ArtCanvas

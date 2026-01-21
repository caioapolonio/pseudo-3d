'use client'
import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react'

interface Point3D {
  x: number
  y: number
  z: number
}

interface Point2D {
  x: number
  y: number
}

interface ArtData {
  vs: Point3D[]
  fs: number[][]
}

interface ArtCanvasProps {
  artData: () => ArtData
  width?: number
  height?: number
  rotationSpeed?: number
  color?: string
}

const ArtCanvas = forwardRef(
  (
    {
      artData,
      width = 400,
      height = 400,
      rotationSpeed = 0.02,
      color = '#50FF50',
    }: ArtCanvasProps,
    ref,
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const speedRef = useRef(rotationSpeed)
    const colorRef = useRef(color)

    useImperativeHandle(ref, () => canvasRef.current)

    useEffect(() => {
      speedRef.current = rotationSpeed
    }, [rotationSpeed])

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
      let angle = 0
      let animationFrameId: number

      const BACKGROUND = '#101010'

      const project = ({ x, y, z }: Point3D): Point2D => ({
        x: x / z,
        y: y / z,
      })

      const translate_z = ({ x, y, z }: Point3D, dz: number): Point3D => ({
        x,
        y,
        z: z + dz,
      })

      const rotate_xz = ({ x, y, z }: Point3D, angle: number): Point3D => {
        const c = Math.cos(angle)
        const s = Math.sin(angle)
        return { x: x * c - z * s, y, z: x * s + z * c }
      }

      const screen = (p: Point2D): Point2D => ({
        x: ((p.x + 1) / 2) * canvas.width,
        y: (1 - (p.y + 1) / 2) * canvas.height,
      })

      const draw = () => {
        angle += speedRef.current
        ctx.fillStyle = BACKGROUND
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.lineWidth = 2
        ctx.strokeStyle = colorRef.current

        fs.forEach((f) => {
          ctx.beginPath()
          for (let i = 0; i < f.length; i++) {
            const pRaw = vs[f[i]]
            if (!pRaw) continue

            const pRot = rotate_xz(pRaw, angle)
            const pTrans = translate_z(pRot, 1)
            const pProj = screen(project(pTrans))

            if (i === 0) ctx.moveTo(pProj.x, pProj.y)
            else ctx.lineTo(pProj.x, pProj.y)
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
        className="rounded-lg shadow-2xl bg-[#101010]"
      />
    )
  },
)
ArtCanvas.displayName = 'ArtCanvas'
export default ArtCanvas

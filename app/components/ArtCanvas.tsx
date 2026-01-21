'use client'
import { useEffect, useRef } from 'react'

// 1. Definição dos tipos para a matemática da arte
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
  fs: number[][] // Array de índices que apontam para os vértices
}

interface ArtCanvasProps {
  artData: () => ArtData
  width?: number
  height?: number
}

export default function ArtCanvas({
  artData,
  width = 400,
  height = 400,
}: ArtCanvasProps) {
  // 2. Tipagem do Ref para HTMLCanvasElement
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const { vs, fs } = artData()
    let angle = 0
    let animationFrameId: number

    const BACKGROUND = '#101010'
    const FOREGROUND = '#50FF50'

    // Funções utilitárias com tipagem explícita
    const project = ({ x, y, z }: Point3D): Point2D => ({ x: x / z, y: y / z })

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
      angle += 0.02
      ctx.fillStyle = BACKGROUND
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.lineWidth = 2
      ctx.strokeStyle = FOREGROUND

      fs.forEach((f) => {
        ctx.beginPath()
        for (let i = 0; i < f.length; i++) {
          const pRaw = vs[f[i]]
          if (!pRaw) continue

          const pRot = rotate_xz(pRaw, angle)
          const pTrans = translate_z(pRot, 1) // dz = 1
          const pProj = screen(project(pTrans))

          if (i === 0) ctx.moveTo(pProj.x, pProj.y)
          else ctx.lineTo(pProj.x, pProj.y)
        }
        if (f.length > 2) {
          ctx.closePath() // Fecha o polígono (ex: liga o índice 3 ao 0)
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
}

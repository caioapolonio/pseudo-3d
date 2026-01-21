'use client'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { ARTS } from '@/lib/arts'
import ArtCanvas from '@/app/components/ArtCanvas'
import Link from 'next/link'

export default function ArtPage() {
  const params = useParams()
  const router = useRouter()

  const [speed, setSpeed] = useState(0.02)
  const [color, setColor] = useState('#50FF50')
  const art = ARTS.find((a) => a.id === params.id)

  if (!art) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
        <h1 className="text-2xl mb-4">Arte não encontrada!</h1>
        <Link href="/" className="text-green-500 underline">
          Voltar para Home
        </Link>
      </div>
    )
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[#050505] text-white p-4">
      <button
        onClick={() => router.back()}
        className="absolute top-8 left-8 text-gray-400 hover:text-green-500 transition"
      >
        ← Voltar
      </button>

      <h1 className="text-5xl font-black mb-4 tracking-tighter uppercase italic text-green-500">
        {art.nome}
      </h1>

      <div className="mb-8 flex flex-col items-center gap-2 bg-gray-900/50 p-4 rounded-xl border border-gray-800">
        <label
          htmlFor="speed"
          className="text-xs uppercase tracking-widest text-gray-400"
        >
          Velocidade de Rotação: {speed.toFixed(3)}
        </label>
        <input
          id="speed"
          type="range"
          min="0"
          max="0.2"
          step="0.001"
          value={speed}
          onChange={(e) => setSpeed(parseFloat(e.target.value))}
          className="w-64 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
        />
      </div>

      <div className="flex flex-col items-center gap-2">
        <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500">
          Cor da Arte
        </label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-10 h-10 bg-transparent border-none cursor-pointer rounded-full overflow-hidden"
          />
          <span className="text-xs font-mono text-gray-400">
            {color.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="relative group">
        <ArtCanvas
          artData={art.data}
          width={600}
          height={600}
          rotationSpeed={speed}
          color={color}
        />
      </div>
    </main>
  )
}

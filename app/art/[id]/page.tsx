'use client'
import { useParams, useRouter } from 'next/navigation'
import { useRef, useState, useEffect } from 'react'
import { ARTS } from '@/lib/arts'
import ArtCanvas from '@/app/components/ArtCanvas'
import Link from 'next/link'

export default function ArtPage() {
  const params = useParams()
  const router = useRouter()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [speed, setSpeed] = useState(0.02)
  const [color, setColor] = useState('#50FF50')
  const [isRecording, setIsRecording] = useState(false)
  const [progress, setProgress] = useState(0)

  const art = ARTS.find((a) => a.id === params.id)

  const handleDownloadVideo = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    setIsRecording(true)
    setProgress(0)

    const stream = canvas.captureStream(60)
    const recorder = new MediaRecorder(stream, {
      mimeType: 'video/webm',
      videoBitsPerSecond: 10000000,
    })
    const chunks: Blob[] = []

    const duration = 10000
    const intervalTime = 100
    const increment = (intervalTime / duration) * 100

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + increment
      })
    }, intervalTime)

    recorder.ondataavailable = (e) => chunks.push(e.data)
    recorder.onstop = () => {
      clearInterval(progressInterval)
      const blob = new Blob(chunks, { type: 'video/webm' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${art?.id || 'art'}-recording.webm`
      a.click()
      URL.revokeObjectURL(url)
      setIsRecording(false)
      setProgress(0)
    }

    recorder.start()
    setTimeout(() => {
      if (recorder.state !== 'inactive') recorder.stop()
    }, duration)
  }

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
        {art.name}
      </h1>

      {/* Controles */}
      <div className="mb-8 flex flex-col md:flex-row items-center gap-8 bg-gray-900/50 p-6 rounded-2xl border border-gray-800">
        <div className="flex flex-col items-center gap-2">
          <label className="text-xs uppercase tracking-widest text-gray-400">
            Velocidade: {speed.toFixed(3)}
          </label>
          <input
            type="range"
            min="0"
            max="0.2"
            step="0.001"
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
            className="w-48 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
          />
        </div>

        <div className="flex flex-col items-center gap-2">
          <label className="text-xs uppercase tracking-widest text-gray-400">
            Cor
          </label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-10 h-10 bg-transparent border-none cursor-pointer"
          />
        </div>

        <div className="flex flex-col items-center gap-3">
          <button
            onClick={handleDownloadVideo}
            disabled={isRecording}
            className={`px-6 py-3 rounded-full font-bold transition-all min-w-[160px] ${
              isRecording
                ? 'bg-red-900 text-red-200'
                : 'bg-green-600 hover:bg-green-500 text-white'
            }`}
          >
            {isRecording ? 'Gravando...' : 'Baixar Vídeo (10s)'}
          </button>

          {/* Barra de Progresso */}
          {isRecording && (
            <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-red-500 h-full transition-all duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      </div>

      <div className="relative group">
        <ArtCanvas
          ref={canvasRef}
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

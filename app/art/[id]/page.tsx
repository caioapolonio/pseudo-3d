'use client'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { ARTS } from '@/lib/arts'
import ArtCanvas from '@/app/components/ArtCanvas'
import Link from 'next/link'

export default function ArtPage() {
  const params = useParams()

  const [horizontalSpeed, setHorizontalSpeed] = useState(0.02)
  const [color, setColor] = useState('#50FF50')
  const [enableVerticalRotation, setEnableVerticalRotation] = useState(false)
  const [verticalSpeed, setVerticalSpeed] = useState(0.02)

  const art = ARTS.find((a) => a.id === params.id)

  if (!art) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
        <h1 className="text-2xl mb-4">Art not found!</h1>
        <Link
          href="/"
          className="text-green-500 hover:text-green-400 underline"
        >
          Back to Home
        </Link>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <header className="p-4 flex items-center justify-between border-b border-zinc-800 bg-black/50 backdrop-blur-sm">
        <Link
          href="/"
          className="flex items-center gap-2 text-green-500 hover:text-green-400 transition-colors font-medium"
        >
          <FaArrowLeft size={20} />
          <span className="hidden sm:inline">Back</span>
        </Link>
        <h1 className="text-xl md:text-3xl font-black uppercase italic text-green-500 tracking-tighter">
          {art.name}
        </h1>
        <div className="w-16 sm:w-20" />
      </header>

      <div className="flex-1 p-4 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start justify-center">
        <div className="w-full max-w-75 md:max-w-150 aspect-square">
          <ArtCanvas
            artData={art.data}
            width={600}
            height={600}
            horizontalSpeed={horizontalSpeed}
            verticalSpeed={enableVerticalRotation ? verticalSpeed : 0}
            color={color}
            className="w-full h-full"
          />
        </div>

        <div className="w-full md:w-80 bg-gray-900/50 p-6 rounded-lg border border-gray-800">
          <div className="mb-6">
            <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4 border-b border-gray-700 pb-2">
              Rotation
            </h3>

            <div className="mb-4">
              <label className="text-xs uppercase tracking-widest text-gray-400 block mb-2">
                Horizontal: {(horizontalSpeed * 100).toFixed(1)}
              </label>
              <input
                type="range"
                min="0"
                max="0.2"
                step="0.001"
                value={horizontalSpeed}
                onChange={(e) => setHorizontalSpeed(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
              />
            </div>

            <div>
              <label className="flex items-center gap-3 cursor-pointer mb-3">
                <input
                  type="checkbox"
                  checked={enableVerticalRotation}
                  onChange={(e) => setEnableVerticalRotation(e.target.checked)}
                  className="w-4 h-4 accent-green-500 cursor-pointer rounded"
                />
                <span className="text-xs uppercase tracking-widest text-gray-400">
                  Enable Vertical Rotation
                </span>
              </label>

              {enableVerticalRotation && (
                <div className="pl-7">
                  <label className="text-xs uppercase tracking-widest text-gray-400 block mb-2">
                    Vertical: {(verticalSpeed * 100).toFixed(1)}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="0.2"
                    step="0.001"
                    value={verticalSpeed}
                    onChange={(e) => setVerticalSpeed(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
                  />
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4 border-b border-gray-700 pb-2">
              Appearance
            </h3>

            <div className="flex items-center gap-4">
              <label className="text-xs uppercase tracking-widest text-gray-400">
                Line Color
              </label>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-10 h-10 bg-transparent border-2 border-gray-700 rounded-lg cursor-pointer hover:border-gray-600 transition-colors"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

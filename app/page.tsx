'use client'
import Link from 'next/link'
import ArtCanvas from '@/app/components/ArtCanvas'
import { donutData } from '@/lib/arts/donut'
import { cubeData } from '@/lib/arts/cube'

const ART = [
  { id: 'donut', nome: 'Donut 3D', data: donutData },
  { id: 'cube', nome: 'Cube 3D', data: cubeData },
]

export default function Home() {
  return (
    <main className="p-8 bg-black min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-8">Meu Portfolio de JS Art</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ART.map((art) => (
          <Link
            href={`/art/${art.id}`}
            key={art.id}
            className="border border-gray-700 p-4 hover:border-green-500 transition"
          >
            <ArtCanvas artData={art.data} width={300} height={300} />
            <h2 className="mt-4 text-xl text-center">{art.nome}</h2>
          </Link>
        ))}
      </div>
    </main>
  )
}

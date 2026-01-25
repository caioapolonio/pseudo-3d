'use client'
import Link from 'next/link'
import ArtCanvas from '@/app/components/ArtCanvas'
import { ARTS } from '@/lib/arts'

export default function Home() {
  return (
    <main className="p-8 bg-black min-h-screen text-white">
      <h1 className="text-4xl text-center font-bold mb-8">
        Pseudo 3D Art Gallery
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {ARTS.map((art) => (
          <Link
            href={`/art/${art.id}`}
            key={art.id}
            className="border border-zinc-800 p-4 hover:border-green-500 transition flex flex-col"
          >
            <ArtCanvas artData={art.data} width={600} height={600} />
            <h2 className="mt-4 text-xl text-center">{art.name}</h2>
          </Link>
        ))}
      </div>
    </main>
  )
}

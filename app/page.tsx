'use client'
import Link from 'next/link'
import ArtCanvas from '@/app/components/ArtCanvas'
import { ARTS } from '@/lib/arts'

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col pb-20">
      <header className="sticky top-0 z-10 bg-black/50 backdrop-blur-sm border-b border-zinc-800">
        <div className="p-4 md:p-6">
          <h1 className="text-2xl md:text-4xl text-center font-bold tracking-tight">
            Pseudo 3D Art Gallery
          </h1>
        </div>
      </header>

      <div className="flex-1 p-4 md:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {ARTS.map((art) => (
            <Link
              href={`/art/${art.id}`}
              key={art.id}
              className="group border border-zinc-800 rounded-xl p-4 hover:border-green-500 transition-all duration-300 flex flex-col bg-zinc-900/30 hover:bg-zinc-900/50"
            >
              <div className="w-full aspect-square">
                <ArtCanvas
                  artData={art.data}
                  width={600}
                  height={600}
                  className="w-full h-full"
                />
              </div>
              <h2 className="mt-4 text-lg md:text-xl text-center font-medium group-hover:text-green-500 transition-colors">
                {art.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}

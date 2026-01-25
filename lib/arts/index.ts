import { ArtData } from '@/app/components/ArtCanvas'
import { donutData } from './donut'
import { cubeData } from './cube'
import { peaceData } from './peace'
import { ballData } from './ball'

export interface Art {
  id: string
  name: string
  data: () => ArtData
}

export const ARTS: Art[] = [
  {
    id: 'donut',
    name: 'Donut',
    data: donutData,
  },
  {
    id: 'cube',
    name: 'Cube',
    data: cubeData,
  },
  {
    id: 'peace',
    name: 'Peace',
    data: peaceData,
  },
  {
    id: 'ball',
    name: 'Ball',
    data: ballData,
  },
]

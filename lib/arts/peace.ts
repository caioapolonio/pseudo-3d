import { ArtData, Point3D } from '@/app/components/ArtCanvas'

export const peaceData = (): ArtData => {
  const vs: Point3D[] = []
  const fs: number[][] = []

  const thickness = 0.04
  const offsety = -0.3

  function addLeaf(angle: number, length: number) {
    const baseIdx = vs.length

    vs.push({ x: 0, y: offsety, z: 0 })

    // Vértice 1: Ponta
    vs.push({
      x: Math.sin(angle) * length,
      y: Math.cos(angle) * length + offsety,
      z: 0,
    })

    // Vértices 2 e 3: Laterais
    const sideAngle = 0.2
    vs.push({
      x: Math.sin(angle - sideAngle) * (length * 0.3),
      y: Math.cos(angle - sideAngle) * (length * 0.3) + offsety,
      z: 0,
    })
    vs.push({
      x: Math.sin(angle + sideAngle) * (length * 0.3),
      y: Math.cos(angle + sideAngle) * (length * 0.3) + offsety,
      z: 0,
    })

    // Vértices 4 e 5: Picos (Volume 3D)
    vs.push({
      x: Math.sin(angle) * (length * 0.4),
      y: Math.cos(angle) * (length * 0.4) + offsety,
      z: thickness,
    })
    vs.push({
      x: Math.sin(angle) * (length * 0.4),
      y: Math.cos(angle) * (length * 0.4) + offsety,
      z: -thickness,
    })

    // Faces/Conexões
    fs.push([baseIdx + 0, baseIdx + 2, baseIdx + 1, baseIdx + 3]) // Losango da folha
    fs.push([baseIdx + 1, baseIdx + 4]) // Linha central cima
    fs.push([baseIdx + 1, baseIdx + 5]) // Linha central baixo
    fs.push([baseIdx + 2, baseIdx + 4])
    fs.push([baseIdx + 3, baseIdx + 4])
    fs.push([baseIdx + 2, baseIdx + 5])
    fs.push([baseIdx + 3, baseIdx + 5])
  }

  const leftAngles = [-1.8, -1.3, -0.9, -0.45]
  const centerAngle = 0
  const rightAngles = [0.45, 0.9, 1.3, 1.8]
  const sizes = [0.35, 0.55, 0.75, 0.8, 0.9]

  leftAngles.forEach((ang, i) => addLeaf(ang, sizes[i]))
  addLeaf(centerAngle, sizes[4])
  rightAngles.forEach((ang, i) => addLeaf(ang, sizes[3 - i]))

  // Caule
  const stemStart = vs.length
  vs.push({ x: 0, y: offsety, z: 0 })
  vs.push({ x: 0, y: -0.1 + offsety, z: 0 }) // Aumentei o y para o caule aparecer mais embaixo
  fs.push([stemStart, stemStart + 1])

  return { vs, fs }
}

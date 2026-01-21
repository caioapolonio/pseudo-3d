export const donutData = () => {
  const vs = []
  const fs = []
  const TRich = 0.5
  const tTube = 0.2
  const rings = 24
  const sides = 12

  for (let i = 0; i < rings; i++) {
    const phi = (i / rings) * Math.PI * 2
    for (let j = 0; j < sides; j++) {
      const theta = (j / sides) * Math.PI * 2
      const x = (TRich + tTube * Math.cos(theta)) * Math.cos(phi)
      const y = (TRich + tTube * Math.cos(theta)) * Math.sin(phi)
      const z = tTube * Math.sin(theta)
      vs.push({ x, y, z })
    }
  }

  for (let i = 0; i < rings; i++) {
    const i_next = (i + 1) % rings
    for (let j = 0; j < sides; j++) {
      const j_next = (j + 1) % sides
      const current = i * sides + j
      const next_side = i * sides + j_next
      const next_ring = i_next * sides + j
      fs.push([current, next_side])
      fs.push([current, next_ring])
    }
  }
  return { vs, fs }
}

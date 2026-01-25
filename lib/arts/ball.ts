export const ballData = () => {
  const vs = []
  const fs = []

  const rings = 12 // Linhas horizontais (latitude)
  const segments = 16 // Linhas verticais (longitude)
  const radius = 0.5

  // 1. Gerar os Vértices
  for (let r = 0; r <= rings; r++) {
    // phi vai de 0 a PI (do topo ao fundo)
    const phi = (r * Math.PI) / rings
    const sinPhi = Math.sin(phi)
    const cosPhi = Math.cos(phi)

    for (let s = 0; s <= segments; s++) {
      // theta vai de 0 a 2*PI (volta completa no anel)
      const theta = (s * 2 * Math.PI) / segments
      const sinTheta = Math.sin(theta)
      const cosTheta = Math.cos(theta)

      const x = cosTheta * sinPhi
      const y = cosPhi // Eixo vertical
      const z = sinTheta * sinPhi

      vs.push({
        x: x * radius,
        y: y * radius,
        z: z * radius,
      })
    }
  }

  // 2. Gerar as Faces (Conectar os pontos)
  for (let r = 0; r < rings; r++) {
    for (let s = 0; s < segments; s++) {
      const first = r * (segments + 1) + s
      const second = first + segments + 1

      // Criamos as conexões das "células" da grade da esfera
      // Cada par de pontos forma uma linha no wireframe
      fs.push([first, first + 1]) // Linha horizontal
      fs.push([first, second]) // Linha vertical
    }
  }
  return { vs, fs }
}

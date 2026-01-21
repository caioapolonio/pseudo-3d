export const cubeData = () => {
  const vs = [
    { x: 0.25, y: 0.25, z: 0.25 },
    { x: -0.25, y: 0.25, z: 0.25 },
    { x: -0.25, y: -0.25, z: 0.25 },
    { x: 0.25, y: -0.25, z: 0.25 },

    { x: 0.25, y: 0.25, z: -0.25 },
    { x: -0.25, y: 0.25, z: -0.25 },
    { x: -0.25, y: -0.25, z: -0.25 },
    { x: 0.25, y: -0.25, z: -0.25 },
  ]

  const fs = [
    [0, 1, 2, 3], // Tampa frente
    [4, 5, 6, 7], // Tampa fundo
    [0, 3, 7, 4], // Lado direito
    [1, 2, 6, 5], // Lado esquerdo
    [0, 1, 5, 4], // Topo
    [3, 2, 6, 7], // Base
  ]
  return { vs, fs }
}

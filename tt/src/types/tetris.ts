export type TetrominosKey = 0 | 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z'
export type TetrominoShape = TetrominosKey[][]

export type BoardCell = [TetrominosKey, string]
export type Board = BoardCell[][]

export interface Player {
  pos: { x: number; y: number }
  tetromino: TetrominoShape
  collided: boolean
}

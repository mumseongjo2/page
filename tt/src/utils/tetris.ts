import type { Board, Player, TetrominoShape, TetrominosKey } from '@@types/tetris'

interface IsColliding {
  player: Player
  board: Board
  moveX: number
  moveY: number
}

export const ROWS = 20
export const COLUMNS = 12
export const CLEAR_ROW_POINTS = [40, 100, 300, 1200]

export const buildBoard = () => {
  const board = Array.from(Array(ROWS), () => Array(COLUMNS).fill([0, 'clear']))

  return board
}

export const randomTetromino = () => {
  const tetrominos: TetrominosKey[] = ['I', 'J', 'L', 'O', 'S', 'T', 'Z']
  const randomTetromino = tetrominos[Math.floor(Math.random() * tetrominos.length)]

  return TETROMINOS[randomTetromino]
}

export const rotate = (matrix: Player['tetromino']) => {
  // 행과 열 교체
  matrix = matrix.map((_, i) => matrix.map((column) => column[i]))

  // 행 역순
  return matrix.map((row) => row.reverse())
}

export const isColliding = ({ player, board, moveX, moveY }: IsColliding) => {
  for (let y = 0; y < player.tetromino.length; y++) {
    for (let x = 0; x < player.tetromino[y].length; x++) {
      // 해당 테트로미노 칸이 빈칸이면 생략
      if (!player.tetromino[y][x]) continue

      const currentX = x + player.pos.x + moveX
      const currentY = y + player.pos.y + moveY

      // 높이 체크, 너비 체크, 이동하려는 셀 상태 체크
      if (
        !board[currentY] ||
        !board[currentY][currentX] ||
        board[currentY][currentX][1] !== 'clear'
      ) {
        return true
      }
    }
  }

  return false
}

export const TETROMINOS: Record<TetrominosKey, { shape: TetrominoShape }> = {
  0: { shape: [[0]] },
  I: {
    shape: [
      [0, 0, 0, 0],
      ['I', 'I', 'I', 'I'],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  },
  J: {
    shape: [
      ['J', 0, 0],
      ['J', 'J', 'J'],
      [0, 0, 0],
    ],
  },
  L: {
    shape: [
      [0, 0, 'L'],
      ['L', 'L', 'L'],
      [0, 0, 0],
    ],
  },
  O: {
    shape: [
      ['O', 'O'],
      ['O', 'O'],
    ],
  },
  S: {
    shape: [
      [0, 'S', 'S'],
      ['S', 'S', 0],
      [0, 0, 0],
    ],
  },
  T: {
    shape: [
      [0, 'T', 0],
      ['T', 'T', 'T'],
      [0, 0, 0],
    ],
  },
  Z: {
    shape: [
      ['Z', 'Z', 0],
      [0, 'Z', 'Z'],
      [0, 0, 0],
    ],
  },
}

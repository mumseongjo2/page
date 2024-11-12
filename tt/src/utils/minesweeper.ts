import {
  Board,
  BoardCell,
  BoardInfo,
  BoardRowColumn,
  ClickIndex,
  TModeName,
} from '@@types/minesweeper'

export const updateBoardInfo = (mode: TModeName) => {
  const modeType: Record<TModeName, BoardInfo> = {
    beginner: { row: 3, column: 3, mine: 3 },
    intermediate: { row: 5, column: 5, mine: 5 },
    advanced: { row: 10, column: 10, mine: 15 },
  }

  return modeType[mode]
}

export const buildBoard = ({ row, column }: BoardRowColumn) => {
  const board = Array.from({ length: row }, (_, r) =>
    Array.from({ length: column }, (_, c) => [r, c, 'uncheck'] as BoardCell),
  )
  return board as Board
}

export const calcArrayIndex = ({
  row,
  clickX,
  clickY,
}: Pick<BoardInfo, 'row'> & ClickIndex) => {
  return row * clickX + clickY
}

const createNotClickIndexArray = (length: number, clickIndex: number) => {
  return Array.from({ length }, (_, i) => i).filter((item) => item !== clickIndex)
}

export const createMineArray = ({
  row,
  column,
  mine,
  clickX,
  clickY,
}: BoardInfo & ClickIndex) => {
  const clickIndex = calcArrayIndex({ row, clickX, clickY })
  const numbers = createNotClickIndexArray(row * column, clickIndex)

  const mineArray = []

  while (mineArray.length !== mine) {
    const index = Math.floor(Math.random() * numbers.length)
    const random = numbers.splice(index, 1)[0]

    mineArray.push(random)
  }

  return mineArray
}

export const updateMineBoard = (
  mineArray: number[],
  { row, column, board }: BoardRowColumn & { board: Board },
) => {
  mineArray.forEach((item) => {
    const mineRow = Math.floor(item / row)
    const mineColumn = item % column

    board[mineRow][mineColumn] = [mineRow, mineColumn, 'mine']
  })
}

const DIRS = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
]

export const checkAroundMine = ({
  clickX,
  clickY,
  board,
  row,
  column,
}: {
  clickX: number
  clickY: number
  board: Board
  row: number
  column: number
}) => {
  const stack = [[clickX, clickY]]

  while (stack.length !== 0) {
    const [currentX, currentY] = stack.pop() as number[]
    const check = []
    let mineCount = 0 as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

    for (const dir of DIRS) {
      const injectX = currentX + dir[0]
      const injectY = currentY + dir[1]

      if (injectX <= -1 || injectY <= -1 || injectX >= row || injectY >= column) continue
      if (
        board[injectX][injectY][2] === 'mineFlag' ||
        board[injectX][injectY][2] === 'mine'
      ) {
        mineCount += 1
        continue
      }
      if (board[injectX][injectY][2] !== 'uncheck') continue

      check.push([injectX, injectY])
    }

    board[currentX][currentY] = [currentX, currentY, mineCount || 'check']

    if (mineCount !== 0) continue

    stack.push(...check)
    for (const coordinate of check) {
      const [checkX, checkY] = coordinate
      board[checkX][checkY] = [checkX, checkY, 'check']
    }
  }
}

export const countUncheck = (board: Board) => {
  let count = 0
  board.forEach((row) => {
    row.forEach((cell) => {
      if (cell[2] === 'check' || Number.isInteger(cell[2])) return

      count += 1
    })
  })

  return count
}

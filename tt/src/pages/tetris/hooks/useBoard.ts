import { buildBoard } from '@utils/tetris'
import { useEffect, useState } from 'react'

import type { Board, BoardCell, Player } from '@@types/tetris'

interface Props {
  player: Player
  resetPlayer: () => void
  removeFirstPreview: () => void
}

const useBoard = ({ player, resetPlayer, removeFirstPreview }: Props) => {
  const [board, setBoard] = useState(buildBoard())
  const [rowsCleared, setRowsCleared] = useState(0)

  const resetBoard = () => {
    setBoard(buildBoard())
  }

  useEffect(() => {
    if (!player.pos) return

    setRowsCleared(0)

    const sweepRows = (newBoard: Board) => {
      return newBoard.reduce((acc, row) => {
        if (row.findIndex((cell) => !cell[0]) === -1) {
          setRowsCleared((prev) => prev + 1)

          // 보드 맨 위 빈 줄 추가
          acc.unshift(new Array(newBoard[0].length).fill([0, 'clear']))
          return acc
        }

        acc.push(row)
        return acc
      }, [] as Board)
    }

    const updateBoard = (prevBoard: Board) => {
      const newBoard = prevBoard.map(
        (row) =>
          row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell)) as BoardCell[],
      )

      player.tetromino.forEach((row, y) => {
        row.forEach((cell, x) => {
          if (cell) {
            newBoard[y + player.pos.y][x + player.pos.x] = [
              cell,
              player.collided ? 'merged' : 'clear',
            ]
          }
        })
      })

      if (player.collided) {
        resetPlayer()
        removeFirstPreview()

        return sweepRows(newBoard)
      }

      return newBoard
    }

    setBoard((prev) => updateBoard(prev))
  }, [player, resetPlayer, removeFirstPreview])

  return { board, setBoard, rowsCleared, resetBoard }
}

export default useBoard

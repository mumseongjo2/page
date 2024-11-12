import { CLEAR_ROW_POINTS } from '@src/utils/tetris'
import { useEffect, useState } from 'react'

const useGameStats = (rowsCleared: number) => {
  const [score, setScore] = useState(0)
  const [rows, setRows] = useState(0)
  const [level, setLevel] = useState(1)

  const resetGameStats = () => {
    setScore(0)
    setRows(0)
    setLevel(1)
  }

  useEffect(() => {
    if (!rowsCleared) return

    setScore((prev) => prev + CLEAR_ROW_POINTS[rowsCleared - 1] * level)
    setRows((prev) => prev + rowsCleared)
  }, [rowsCleared, level])

  useEffect(() => {
    if (rows <= level * 10) return

    setLevel((prev) => prev + 1)
  }, [rows, level])

  return { score, rows, level, resetGameStats }
}

export default useGameStats

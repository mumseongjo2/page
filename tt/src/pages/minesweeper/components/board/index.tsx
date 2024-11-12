import styles from '@minesweeper/components/board/board.module.scss'
import Cell from '@minesweeper/components/board/cell'

import { Board as TBoard } from '@@types/minesweeper'

interface Props {
  board: TBoard
  isView: boolean
}

const Board = ({ board, isView }: Props) => {
  if (!isView) return null

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.game}
        style={
          { '--row': board.length, '--column': board[0].length } as React.CSSProperties
        }
      >
        {board.map((row) =>
          row.map((cell, index) => {
            const key = `${cell[2]}-${index}`
            return <Cell key={key} x={cell[0]} y={cell[1]} type={cell[2]} />
          }),
        )}
      </div>
    </div>
  )
}

export default Board

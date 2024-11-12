import styles from '@tetris/components/board/board.module.scss'
import Cell from '@tetris/components/board/cell'

import type { Board as TBoard } from '@@types/tetris'

interface Props {
  board: TBoard
}

const Board = ({ board }: Props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.game}>
        {board.map((row) =>
          row.map((cell, index) => {
            const key = `${cell[0]}-${index}`
            return <Cell key={key} type={cell[0]} />
          }),
        )}
      </div>
    </div>
  )
}

export default Board

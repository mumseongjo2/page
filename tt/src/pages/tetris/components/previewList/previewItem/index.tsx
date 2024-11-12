import { cx } from '@styles/index'
import styles from '@tetris/components/previewList/previewItem/previewItem.module.scss'

import type { TetrominoShape } from '@@types/tetris'

interface Props {
  tetromino: TetrominoShape
}

const PreviewItem = ({ tetromino }: Props) => {
  return (
    <li className={styles.wrapper}>
      <div className={styles.box}>
        {tetromino.map((row, index) => {
          const key = `row-${index}`
          return (
            <div key={key} className={styles.row}>
              {row.map((cell, index) => {
                const key = `${cell}-${index}`
                return (
                  <div key={key} className={cx(styles.cell, styles[`cell-${cell}`])} />
                )
              })}
            </div>
          )
        })}
      </div>
    </li>
  )
}

export default PreviewItem

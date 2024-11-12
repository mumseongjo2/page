import PreviewItem from '@tetris/components/previewList/previewItem'
import styles from '@tetris/components/previewList/previewList.module.scss'

import type { TetrominoShape } from '@@types/tetris'

interface Props {
  tetrominoes: TetrominoShape[]
}

const PreviewList = ({ tetrominoes }: Props) => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>NEXT</h2>

      <ul className={styles.previewList}>
        {tetrominoes.map((tetromino, index) => {
          const key = `${tetromino}-${index}`
          return <PreviewItem key={key} tetromino={tetromino} />
        })}
      </ul>
    </div>
  )
}

export default PreviewList

import { cx } from '@styles/index'
import styles from '@tetris/components/board/cell/cell.module.scss'
import { memo } from 'react'

import type { TetrominosKey } from '@@types/tetris'

interface Props {
  type: TetrominosKey
}

const Cell = ({ type }: Props) => {
  return <div className={cx(styles.cell, styles[`cell-${type}`])} />
}

export default memo(Cell)

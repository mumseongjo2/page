import { BombIcon, FlagIcon } from '@assets/svgs'
import { useAppDispatch, useAppSelector } from '@hooks/state'
import styles from '@minesweeper/components/board/cell/cell.module.scss'
import {
  clickGround,
  createFirstClickBoard,
  ctxMenuFlag,
  selectIsFirst,
  selectStatus,
} from '@states/minesweeper'
import { cx } from '@styles/index'
import { memo } from 'react'

import { CellInfo } from '@@types/minesweeper'

interface Props {
  x: number
  y: number
  type: CellInfo
}

const Cell = ({ x, y, type }: Props) => {
  const dispatch = useAppDispatch()
  const isFirst = useAppSelector(selectIsFirst)
  const status = useAppSelector(selectStatus)

  console.log(type)
  const handleClick = () => {
    if (type === 'check' || Number.isInteger(type)) return
    if (status !== 'start') return

    isFirst
      ? dispatch(createFirstClickBoard({ clickX: x, clickY: y }))
      : dispatch(clickGround({ clickX: x, clickY: y, type }))
  }

  const handleCtxMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (type === 'check' || Number.isInteger(type)) return
    if (status !== 'start') return
    if (isFirst) return

    dispatch(ctxMenuFlag({ clickX: x, clickY: y, type }))
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      onContextMenu={handleCtxMenu}
      className={cx(styles.cell, styles[`cell-${type}`])}
    >
      {Number.isInteger(type) && type}
      {status === 'start' && (type === 'flag' || type === 'mineFlag') && (
        <FlagIcon style={{ fill: 'white' }} />
      )}
      {status !== 'start' && (type === 'mine' || type === 'mineFlag') && (
        <BombIcon style={{ fill: 'white' }} />
      )}
    </button>
  )
}

export default memo(Cell)

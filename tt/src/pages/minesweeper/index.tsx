import { Button, TextBox } from '@components/index'
import { useAppDispatch, useAppSelector } from '@hooks/state'
import useInterval from '@hooks/useInterval'
import { Board, Menu } from '@minesweeper/components'
import styles from '@minesweeper/minesweeper.module.scss'
import { changeStatus, createBoard, reset, selectMinesweeper } from '@states/minesweeper'
import { countUncheck } from '@utils/minesweeper'
import { useEffect, useState } from 'react'

import { TModeName } from '@@types/minesweeper'

const Minesweeper = () => {
  const [timer, setTimer] = useState(0)

  const dispatch = useAppDispatch()
  const { board, boardInfo, isFirst, status } = useAppSelector(selectMinesweeper)

  const handleModeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(createBoard({ mode: e.currentTarget.value as TModeName }))
    setTimer(0)
  }

  const handleMenuClick = () => {
    dispatch(changeStatus('stop'))
  }

  useInterval(() => {
    if (isFirst || status !== 'start') return

    setTimer((prev) => prev + 1)
  }, 1000)

  useEffect(() => {
    if (!board.length) return
    if (countUncheck(board) !== boardInfo.mine) return

    dispatch(changeStatus('win'))
  }, [board, boardInfo, dispatch])

  useEffect(() => {
    dispatch(reset())
  }, [dispatch])

  return (
    <div className={styles.container}>
      <div className={styles.modeWrapper}>
        <Button onClick={handleModeClick} text="초급" value="beginner" />
        <Button onClick={handleModeClick} text="중급" value="intermediate" />
        <Button onClick={handleModeClick} text="고급" value="advanced" />
      </div>

      <div className={styles.infoWrapper}>
        <TextBox title="지뢰" content={`${boardInfo.mine}개`} />
        <TextBox title="타이머" content={`${timer}초`} />
      </div>

      <Board board={board} isView={board.length !== 0} />
      <Menu onClick={handleMenuClick} status={status} />
    </div>
  )
}

export default Minesweeper

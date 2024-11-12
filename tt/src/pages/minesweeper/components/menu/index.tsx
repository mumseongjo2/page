import styles from '@minesweeper/components/menu/menu.module.scss'
import { Button } from '@src/components'
import { GameStatus } from '@src/types/minesweeper'

interface Props {
  onClick: () => void
  status: GameStatus
}

const Menu = ({ onClick, status }: Props) => {
  if (status === 'start' || status === 'stop') return null

  return (
    <div className={styles.wrapper}>
      <Button onClick={onClick} text="승리" isView={status === 'win'} />
      <Button onClick={onClick} text="패배" isView={status === 'lose'} />
    </div>
  )
}

export default Menu

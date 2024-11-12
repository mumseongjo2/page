import { Button } from '@components/index'
import styles from '@tetris/components/menu/menu.module.scss'

interface Props {
  onClick: () => void
  isView: boolean
}

const Menu = ({ onClick, isView }: Props) => {
  if (!isView) return null

  return (
    <div className={styles.wrapper}>
      <Button isView={isView} onClick={onClick} text="Play Tetris?" size={5} />
    </div>
  )
}

export default Menu

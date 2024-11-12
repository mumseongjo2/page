import styles from '@home/components/gameList/gameList.module.scss'

interface Props {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const GAME_LIST = [
  { title: '테트리스', path: '/arcade/tetris' },
  { title: '지뢰찾기', path: '/arcade/minesweeper' },
]

const GameList = ({ onClick }: Props) => {
  return (
    <ul className={styles.wrapper}>
      {GAME_LIST.map((item) => (
        <li key={item.title}>
          <button
            type="button"
            onClick={onClick}
            value={item.path}
            className={styles.button}
          >
            {item.title}
          </button>
        </li>
      ))}
    </ul>
  )
}

export default GameList

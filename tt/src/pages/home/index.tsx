import GameList from '@home/components/gameList'
import styles from '@home/home.module.scss'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate(e.currentTarget.value)
  }

  return (
    <div className={styles.container}>
      <h1>Game List</h1>

      <GameList onClick={handleClick} />

      <h2>Coming soon...</h2>
      <span>Tic-Tac-Toe</span>
    </div>
  )
}

export default Home

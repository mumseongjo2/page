import styles from '@components/layout/layout.module.scss'
import { Outlet, useNavigate } from 'react-router-dom'

const Layout = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/arcade/')
  }

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <button type="button" onClick={handleClick} className={styles.headerButton}>
          Arcade
        </button>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout

import styles from '@tetris/components/gameStats/gameStats.module.scss'

interface Props {
  level: number
  score: number
  rows: number
}

const GameStats = ({ level, score, rows }: Props) => {
  const STATS_ITEM = [
    { title: 'LEVEL', content: level },
    { title: 'SCORE', content: score },
    { title: 'ROWS', content: rows },
  ]

  return (
    <dl className={styles.wrapper}>
      {STATS_ITEM.map(({ title, content }) => (
        <div key={title} className={styles.box}>
          <dt className={styles.title}>{title}</dt>
          <dd className={styles.content}>{content}</dd>
        </div>
      ))}
    </dl>
  )
}

export default GameStats

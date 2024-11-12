import styles from '@components/button/button.module.scss'

interface Props {
  text: string
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  isView?: boolean
  value?: string
  size?: number
}

const Button = ({ text, onClick, isView = true, value, size = 2 }: Props) => {
  if (!isView) return null

  return (
    <button
      type="button"
      onClick={onClick}
      value={value}
      className={styles.button}
      style={{ '--size': `${size}rem` } as React.CSSProperties}
    >
      {text}
    </button>
  )
}

export default Button

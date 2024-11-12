import styles from '@components/textBox/textBox.module.scss'

interface Props {
  title: string
  content: string
}

const TextBox = ({ title, content }: Props) => {
  return (
    <dl className={styles.box}>
      <dt>{title}</dt>
      <dd>{content}</dd>
    </dl>
  )
}

export default TextBox

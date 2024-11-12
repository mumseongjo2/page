import styles from '@tetris/components/info/info.module.scss'

const INFO_TEXT = [
  '방향키를 이용해주세요',
  '레벨이 오를수록 속도가 빨라져요',
  '한 번에 많이 클리어할수록 높은 점수를 얻어요',
]

const Info = () => {
  return (
    <div className={styles.infobar}>
      {INFO_TEXT.map((item) => (
        <span key={item} className={styles.infoText}>
          {item}
        </span>
      ))}
    </div>
  )
}

export default Info

import { randomTetromino } from '@src/utils/tetris'
import { useCallback, useState } from 'react'

import type { TetrominoShape } from '@@types/tetris'

const usePreview = () => {
  const [previewList, setPreviewList] = useState<TetrominoShape[]>([])

  const resetPreview = () => {
    setPreviewList([
      randomTetromino().shape,
      randomTetromino().shape,
      randomTetromino().shape,
    ])
  }

  const removeFirstPreview = useCallback(() => {
    setPreviewList(previewList.filter((_, index) => index !== 0))
  }, [previewList])

  const addPreview = () => {
    setPreviewList((prev) => [...prev, randomTetromino().shape])
  }

  const firstPreview = previewList[0]

  return { previewList, resetPreview, removeFirstPreview, addPreview, firstPreview }
}

export default usePreview

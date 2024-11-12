import { isColliding, randomTetromino, rotate } from '@src/utils/tetris'
import { useCallback, useState } from 'react'

import type { Board, Player, TetrominoShape } from '@@types/tetris'

interface UpdatePlayer {
  x: number
  y: number
  collided: boolean
}

const usePlayer = (firstPreview: TetrominoShape) => {
  const [player, setPlayer] = useState({} as Player)

  const updatePlayerPos = ({ x, y, collided }: UpdatePlayer) => {
    setPlayer((prev) => ({
      ...prev,
      pos: { x: prev.pos.x + x, y: prev.pos.y + y },
      collided,
    }))
  }

  const firstPlayer = () => {
    setPlayer({
      pos: { x: 10 / 2, y: 0 },
      tetromino: randomTetromino().shape,
      collided: false,
    })
  }

  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: 10 / 2, y: 0 },
      tetromino: firstPreview,
      collided: false,
    })
  }, [firstPreview])

  const rotatePlayer = (board: Board) => {
    const clonedPlayer = JSON.parse(JSON.stringify(player)) as Player
    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino)

    // clonedPlayer의 현재 x 위치를 기준으로 -1,+1씩 증가시키면서 양옆 충돌 여부 체크
    const posX = clonedPlayer.pos.x
    let offSet = -1
    while (isColliding({ player: clonedPlayer, board, moveX: 0, moveY: 0 })) {
      clonedPlayer.pos.x += offSet
      offSet = -(offSet + (offSet > 0 ? 1 : -1))

      if (offSet > clonedPlayer.tetromino[0].length) {
        clonedPlayer.pos.x = posX
        return
      }
    }

    setPlayer(clonedPlayer)
  }

  return { player, updatePlayerPos, firstPlayer, resetPlayer, rotatePlayer }
}

export default usePlayer

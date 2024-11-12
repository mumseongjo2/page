import { useEffect, useRef } from 'react'

const useInterval = (callback: () => void, delay: number | null) => {
  const saveCallback = useRef<null | (() => void)>(null)

  useEffect(() => {
    saveCallback.current = callback
  }, [callback])

  useEffect(() => {
    if (!delay && delay !== 0) return

    function tick() {
      if (!saveCallback.current) return

      saveCallback.current()
    }

    const id = setInterval(tick, delay)

    return () => clearInterval(id)
  }, [delay])
}

export default useInterval

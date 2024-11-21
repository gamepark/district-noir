/** @jsxImportSource @emotion/react */
import { FC } from 'react'
import { createPortal } from 'react-dom'

export const PlayerPanels: FC<any> = () => {
  const root = document.getElementById('root')
  if (!root) {
    return null
  }

  return createPortal(
    <>
    </>,
    root
  )
}
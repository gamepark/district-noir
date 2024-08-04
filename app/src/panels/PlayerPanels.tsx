/** @jsxImportSource @emotion/react */
import { PlayerColor } from '@gamepark/district-noir/PlayerColor'
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

export const playerColorCode: Record<PlayerColor, string> = {
  [PlayerColor.Red]: 'red',
  [PlayerColor.Blue]: 'blue',
  [PlayerColor.Green]: 'green',
  [PlayerColor.Yellow]: 'yellow'
}
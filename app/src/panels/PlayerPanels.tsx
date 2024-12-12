/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { StyledPlayerPanel, usePlayerId, usePlayers, useRules } from '@gamepark/react-game'
import { FC } from 'react'
import { createPortal } from 'react-dom'
import Player1 from '../images/player-1.jpg'
import Player2 from '../images/player-2.jpg'

export const PlayerPanels: FC<any> = () => {
  const players = usePlayers()
  const player = usePlayerId()
  const rules = useRules()!
  const root = document.getElementById('root')
  if (!root) {
    return null
  }

  return createPortal(
    <>
      {players.map((p) => {
        const top = p.id === (player ?? rules.game.players[0])
        return (
          <StyledPlayerPanel
            key={p.id}
            player={p.id}
            css={top? topPanel: bottomPanel}
            backgroundImage={p.id === 1? Player1: Player2}
          />
        )
      })}
    </>,
    root
  )
}

const topPanel = css`
  position: absolute;
  right: 1em;
  top: 9em;
`

const bottomPanel = css`
  position: absolute;
  right: 1em;
  bottom: 1em;
`
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { DistrictNoirRules } from '@gamepark/district-noir/DistrictNoirRules'
import { StyledPlayerPanel, usePlayerId, usePlayers, useRules } from '@gamepark/react-game'
import { FC } from 'react'
import { createPortal } from 'react-dom'
import Player1 from '../images/player-1.jpg'
import Player2 from '../images/player-2.jpg'

export const PlayerPanels: FC<any> = () => {
  const players = usePlayers({ sortFromMe: true })
  const rules = useRules<DistrictNoirRules>()!
  const playerId = usePlayerId()
  const root = document.getElementById('root')
  if (!root) {
    return null
  }

  return createPortal(
    <>
      {players.map((p) => {
        const bottom = (p.id === (playerId ?? rules.players[0]))
        return (
          <StyledPlayerPanel
            key={p.id}
            player={p}
            css={bottom? bottomPanel: topPanel}
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
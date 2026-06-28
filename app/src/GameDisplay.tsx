import { css } from '@emotion/react'
import { DevToolsHub, GameTable, GameTableNavigation } from '@gamepark/react-game'
import { PlayerPanels } from './panels/PlayerPanels'

export function GameDisplay() {
  return (
    <GameTable
      verticalCenter
      xMin={-50}
      xMax={50}
      yMin={-30}
      yMax={30}
      margin={{ top: 7, left: 0, right: 0, bottom: 0 }}
      css={process.env.NODE_ENV === 'development' && tableBackground}
    >
      <GameTableNavigation />
      <PlayerPanels />
      {process.env.NODE_ENV === 'development' && <DevToolsHub fabBottom="calc(5em)" />}
    </GameTable>
  )
}

const tableBackground = css`
  background-color: rgba(255, 255, 255, 0.2);
`

import { ScoringHelper } from '@gamepark/district-noir/rules/helper/ScoringHelper'
import { useGame, usePlayerId, usePlayerName, useRankedPlayers, useResultText } from '@gamepark/react-game'
import { MaterialGame } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'

export const GameOverHeader: FC = () => {
  const resultText = useResultText()
  const game = useGame<MaterialGame>()!;
  const rankedPlayer = useRankedPlayers()
  const playerId = usePlayerId()
  const winner = rankedPlayer[0].id
  const iWin = winner === playerId
  const winnerScoring = new ScoringHelper(game, winner)
  const playerName = usePlayerName(winner)

  if (winnerScoring.cities.length === 3) {
    if (iWin) {
      return <Trans defaults="win.cities" />
    } else {
      return <Trans defaults="win.cities.other"  values={{ player: playerName }} />
    }
  } else {
    return <>{resultText}</>
  }
}
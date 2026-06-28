import { CustomMoveType } from '@gamepark/district-noir/rules/CustomMoveType'
import { PlayerActionRule } from '@gamepark/district-noir/rules/PlayerActionRule'
import { PlayMoveButton, useGame, useLegalMove, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { isCustomMoveType, MaterialGame } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'

export const PlayerTurnHeader = () => {
  const game = useGame<MaterialGame>()!
  const rule = new PlayerActionRule(game)
  const take = useLegalMove((move) => isCustomMoveType(CustomMoveType.Take)(move))
  const playerId = usePlayerId()
  const activePlayer = rule.getActivePlayer()
  const itsMe = activePlayer === playerId
  const name = usePlayerName(activePlayer)
  if (rule.canTake) {
    if (rule.hand.length) {
      return (
        <Trans i18nKey={itsMe ? 'header.choice' : 'header.choice.other'} values={{ number: rule.lastFiveCards.length, player: name }}>
          <PlayMoveButton move={take}/>
        </Trans>
      )
    } else {
      return (
        <Trans i18nKey={itsMe ? 'header.take' : 'header.take.other'} values={{ number: rule.lastFiveCards.length, player: name }}>
          <PlayMoveButton move={take}/>
        </Trans>
      )
    }
  } else {
    return (
      <Trans i18nKey={itsMe ? 'header.play' : 'header.play.other'} values={{ player: name }}>
        <PlayMoveButton move={take}/>
      </Trans>
    )
  }
}

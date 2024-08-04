/** @jsxImportSource @emotion/react */

import { DistrictNoirRules } from "@gamepark/district-noir/DistrictNoirRules"
import { CustomMoveType } from "@gamepark/district-noir/rules/CustomMoveType"
import { PlayMoveButton, useLegalMove, usePlayerId, useRules } from "@gamepark/react-game"
import { isCustomMoveType } from "@gamepark/rules-api"

export const PlayerTurnHeader = () => {
  const rules = useRules<DistrictNoirRules>()!
  const take = useLegalMove((move) => isCustomMoveType(CustomMoveType.Take)(move))
  const playerId = usePlayerId()
  const activePlayer = rules.getActivePlayer()
  const itsMe = activePlayer === playerId
  if (itsMe) {
    return (
      <>
        <PlayMoveButton move={take}>
          Prendre
        </PlayMoveButton>
      </>
    )
  }

  return <>Hello world!</>
}

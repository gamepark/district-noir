import { LocationType } from '@gamepark/district-noir/material/LocationType'
import { MaterialType } from '@gamepark/district-noir/material/MaterialType'
import { and, isMyMove, MaterialGameAnimations } from '@gamepark/react-game'
import { isMoveItemType } from '@gamepark/rules-api'


export const gameAnimations = new MaterialGameAnimations()

gameAnimations
  .configure(and((move) => isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.PlayerColumns, isMyMove()))
  .duration(400)

gameAnimations
  .configure(and((move) => isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.PlayArea, isMyMove()))
  .duration(400)

gameAnimations
  .configure((move) => isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.PlayerColumns)
  .duration(400)

gameAnimations
  .configure((move) => isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.Hand)
  .duration(300)
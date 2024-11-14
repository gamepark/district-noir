import { LocationType } from '@gamepark/district-noir/material/LocationType'
import { MaterialType } from '@gamepark/district-noir/material/MaterialType'
import { MaterialGameAnimations } from '@gamepark/react-game'
import { isMoveItemType } from '@gamepark/rules-api'


export const gameAnimations = new MaterialGameAnimations()

gameAnimations
  .when()
  .move((move) => isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.PlayerColumns)
  .mine()
  .duration(0.4)

gameAnimations
  .when()
  .move((move) => isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.PlayArea)
  .mine()
  .duration(0.4)

gameAnimations
  .when()
  .move((move) => isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.PlayerColumns)
  .duration(0.4)

gameAnimations
  .when()
  .move((move) => isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.Hand)
  .duration(0.2)
import { LocationType } from '@gamepark/district-noir/material/LocationType'
import { MaterialType } from '@gamepark/district-noir/material/MaterialType'
import { isItemContext, ListLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { gameCardDescription } from '../material/GameCardDescription'
import { gameDeckLocator } from './DeckLocator'

export class PlayAreaLocator extends ListLocator {

  getCoordinates(location: Location, context: MaterialContext): Coordinates {
    const deckCoordinates = gameDeckLocator.coordinates
    const { rules } = context
    const isEnded = rules.game.rule === undefined
    const locationX = isItemContext(context)? location.x!:  rules.material(MaterialType.Card).location(LocationType.PlayArea).length
    const x = isEnded? (deckCoordinates.x + locationX * 0.1): deckCoordinates.x + (locationX + 1) * (gameCardDescription.width + 1)
    return {
      x: x,
      y: deckCoordinates.y,
      z: 1
    }
  }
}

export const playAreaLocator = new PlayAreaLocator()
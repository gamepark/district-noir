import { LocationType } from '@gamepark/district-noir/material/LocationType'
import { LocationContext, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { gameCardDescription } from '../../material/GameCardDescription'
import { Location, Coordinates } from '@gamepark/rules-api'
import { gameDeckLocator } from '../DeckLocator'
import { MaterialType } from '@gamepark/district-noir/material/MaterialType'
//import { CardDescription } from '../../material/DeckDescription'

export class PlayerAreaDescription extends LocationDescription {
    location = { type: LocationType.PlayArea }
    width = gameCardDescription.width
    height = gameCardDescription.height

  getCoordinates(_location: Location, context: LocationContext): Coordinates {
    const rules = context.rules
    const x = rules.material(MaterialType.Card).location(LocationType.PlayArea).length
    return this.getPlayAreaCoordinates({ ...this.location, x: x }, context)
  }

  getPlayAreaCoordinates(location: Location, _context: MaterialContext): Coordinates {
    const deckCoordinates = gameDeckLocator.coordinates
      return {
        x: deckCoordinates.x + (location.x! + 1) * (gameCardDescription.width + 1),
        y: deckCoordinates.y,
        z: 1
      }
  }
}
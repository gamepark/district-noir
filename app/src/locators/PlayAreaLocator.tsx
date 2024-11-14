import { LocationType } from '@gamepark/district-noir/material/LocationType'
import { MaterialType } from '@gamepark/district-noir/material/MaterialType'
import { DropAreaDescription, isItemContext, ListLocator, LocationContext, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'
import { gameCardDescription } from '../material/GameCardDescription'
import { gameDeckLocator } from './DeckLocator'

const gapOverlap = 0.5
const fullVisibleCards = 5
export class PlayAreaLocator extends ListLocator {

  locationDescription = new DropAreaDescription(gameCardDescription)

  getGap(location: Location, context: MaterialContext): Partial<Coordinates> {
    const { rules } = context
    const isEnded = rules.game.rule === undefined
    if (isEnded) return { x: 0 }
    const areaLength = rules.material(MaterialType.Card).location(LocationType.PlayArea).length
    if (areaLength > fullVisibleCards && location.x! < areaLength - fullVisibleCards) return { x: gameCardDescription.width * gapOverlap}
    return {
      x: gameCardDescription.width + 1
    }
  }

  getCoordinates(location: Location, context: MaterialContext): Coordinates {
    const deckCoordinates = { ...gameDeckLocator.coordinates }
    const { rules } = context
    const isEnded = rules.game.rule === undefined
    const areaLength = rules.material(MaterialType.Card).location(LocationType.PlayArea).length
    const locationX = isItemContext(context)? location.x!: (areaLength + 1)
    let x = isEnded ? (deckCoordinates.x + locationX * 0.1) : (deckCoordinates.x + gameCardDescription.width + 1)
    if (!isEnded && areaLength > fullVisibleCards && locationX >= areaLength - fullVisibleCards) x -= ((gameCardDescription.width * (1 - gapOverlap) + 1) * (areaLength - (fullVisibleCards + 1)))
    return {
      x: x,
      y: deckCoordinates.y,
      z: 1
    }
  }

  getLocationIndex(_location: Location, context: LocationContext) {
    return context.rules.material(MaterialType.Card).location(LocationType.PlayArea).length
  }

  getItemIndex(item: MaterialItem) {
    return item.location.x!
  }

  dropPreview = true
}

export const playAreaLocator = new PlayAreaLocator()
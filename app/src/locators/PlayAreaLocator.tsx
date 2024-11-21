import { Interpolation, Theme } from '@emotion/react'
import { LocationType } from '@gamepark/district-noir/material/LocationType'
import { MaterialType } from '@gamepark/district-noir/material/MaterialType'
import { DropAreaDescription, ItemContext, ListLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'
import { gameCardDescription } from '../material/GameCardDescription'
import { gameDeckLocator } from './DeckLocator'

const gapOverlap = 0.5
const fullVisibleCards = 8
export class PlayAreaLocator extends ListLocator {


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
    const locationX = location.x!
    let x = isEnded ? (deckCoordinates.x + locationX * 0.1) : (deckCoordinates.x + gameCardDescription.width + 1)
    if (!isEnded && locationX !== undefined && areaLength > fullVisibleCards && locationX >= areaLength - fullVisibleCards) {
      x -= ((gameCardDescription.width * (1 - gapOverlap) + 1) * (areaLength - (fullVisibleCards + 1)))
    }
    return {
      x: x,
      y: deckCoordinates.y,
      z: 0.05
    }
  }

  // THIS IS ONLY FOR PREVIEW: There is no other cases where the item has a x equals to the area length
  getItemCoordinates(item: MaterialItem, context: ItemContext) {
    const coordinates = super.getItemCoordinates(item, context)
    const { rules } = context
    const areaLength = rules.material(MaterialType.Card).location(LocationType.PlayArea).length
    if (item.location.x === undefined && areaLength > fullVisibleCards) {
      coordinates.x = (coordinates.x ?? 0) - ((gameCardDescription.width * (1 - gapOverlap) + 1))
    }

    return coordinates
  }

  getAreaCoordinates(_location: Location, _context: MaterialContext): Partial<Coordinates> {
    return { x: 4, y: 0, z: 1 }
  }

  getItemIndex(item: MaterialItem, context: ItemContext) {
    const { rules } = context
    const areaLength = rules.material(MaterialType.Card).location(LocationType.PlayArea).length
    return item.location.x ?? areaLength
  }

  dropPreview = true
  locationDescription = new PlayAreaDescription()
}

class PlayAreaDescription extends DropAreaDescription {
  height = gameCardDescription.height
  width = 80
  borderRadius = gameCardDescription.borderRadius

  get dropHighlight(): Interpolation<Theme> {
    return
  }
}

export const playAreaLocator = new PlayAreaLocator()
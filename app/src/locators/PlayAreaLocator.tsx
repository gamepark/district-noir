import { ItemContext, LineLocator } from '@gamepark/react-game'
import { Coordinates, MaterialItem } from '@gamepark/rules-api'
import { PlayerAreaDescription } from './Description/PlayAreaDescription'

export class PlayAreaLocator extends LineLocator {
  locationDescription = new PlayerAreaDescription()

  getCoordinates(item: MaterialItem, context: ItemContext): Coordinates {
    return this.locationDescription.getPlayAreaCoordinates(item.location, context)
  } 
  // L: 8=====D---       |
  // P: 8==========D---->|
}

export const playAreaLocator = new PlayAreaLocator()
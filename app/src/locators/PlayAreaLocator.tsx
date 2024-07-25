import { ItemContext, LineLocator } from '@gamepark/react-game'
import { Coordinates, MaterialItem } from '@gamepark/rules-api'
import { PlayerAreaDescription } from './Description/PlayAreaDescription'
import { gameCardDescription } from '../material/GameCardDescription'

export class PlayAreaLocator extends LineLocator {
    locationDescription = new PlayerAreaDescription()
    delta = { x: gameCardDescription.width + 1, y: 0, z: 0}

  getCoordinates(item: MaterialItem, { rules, player }: ItemContext): Coordinates {
      return {
        x: this.locationDescription.coordinates.x - ((gameCardDescription.width + 1) / 2),
        y: this.locationDescription.coordinates.y + (item.location.player === (player ?? rules.players[0])? 2: -2),
        z: 1
      }
  }
}

export const playAreaLocator = new PlayAreaLocator()
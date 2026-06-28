import { DeckLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'

export class GameDeckLocator extends DeckLocator {
  getGap(_location: Location, context: MaterialContext): Partial<Coordinates> {
    if (context.rules.game.rule === undefined) return { x: -0.05, y: 0, z: 0.05 }
    return { x: -0.05, y: -0.05, z: 0.05 }
  }

  getPositionDependencies(_location: Location, context: MaterialContext) {
    return { ended: context.rules.game.rule === undefined }
  }

  coordinates = { x: -40, y: 0, z: 0 }
}

export const gameDeckLocator = new GameDeckLocator()
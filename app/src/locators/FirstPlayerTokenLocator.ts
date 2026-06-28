import { Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

export class FirstPlayerTokenLocator extends Locator {
  getCoordinates(location: Location, context: MaterialContext) {
    if (location?.player !== (context.player ?? context.rules.players[0])) {
      return { x: -40, y: -20 }
    }

    return { x: -40, y: 20 }
  }

  getPositionDependencies(_location: Location, context: MaterialContext) {
    return { player: context.player ?? context.rules.players[0] }
  }
}

export const firstPlayerTokenLocator = new FirstPlayerTokenLocator()
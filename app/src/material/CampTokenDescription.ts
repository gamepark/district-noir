import { MaterialContext, RoundTokenDescription } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import Back from '../images/tokensBack.jpg'
import Front from '../images/tokensFront.jpg'
import { CampHelp } from './help/CampHelp'

export class CampTokenDescription extends RoundTokenDescription {
  diameter = 5

  image = Front
  backImage = Back

  isFlipped(item: Partial<MaterialItem>, context: MaterialContext): boolean {
    return item.location?.player !== (context.player ?? context.rules.players[0])
  }

  help = CampHelp
}

export const firstPlayerTokenDescription = new CampTokenDescription()
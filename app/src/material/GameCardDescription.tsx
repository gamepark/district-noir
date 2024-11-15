import { Card } from '@gamepark/district-noir/material/Card'
import { LocationType } from '@gamepark/district-noir/material/LocationType'
import { CardDescription, MaterialContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'

import Alliance2 from '../images/Alliance2.jpg'
import Alliance3 from '../images/Alliance3.jpg'
import Alliance4 from '../images/Alliance4.jpg'

import Back from '../images/Back.jpg'

import Betrayal1 from '../images/Betrayal1.jpg'
import Betrayal2 from '../images/Betrayal2.jpg'
import Betrayal3 from '../images/Betrayal3.jpg'

import CityHall from '../images/CityHall.jpg'
import PoliceDepartment from '../images/PoliceDepartment.jpg'

import Support5 from '../images/Support5.jpg'
import Support6 from '../images/Support6.jpg'
import Support7 from '../images/Support7.jpg'
import Support8 from '../images/Support8.jpg'
import TheDocks from '../images/TheDocks.jpg'
import { GameCardHelp } from './help/GameCardHelp'


export class GameCardDescription extends CardDescription {
  width = 6.1
  height = 11.2

  backImage = Back

  images = {
    [Card.Support5]: Support5,
    [Card.Support6]: Support6,
    [Card.Support7]: Support7,
    [Card.Support8]: Support8,

    [Card.Alliance2]: Alliance2,
    [Card.Alliance3]: Alliance3,
    [Card.Alliance4]: Alliance4,

    [Card.Betrayal1]: Betrayal1,
    [Card.Betrayal2]: Betrayal2,
    [Card.Betrayal3]: Betrayal3,

    [Card.CityHall]: CityHall,
    [Card.PoliceDepartment]: PoliceDepartment,
    [Card.TheDocks]: TheDocks

  }

  isFlippedOnTable(item: Partial<MaterialItem>, context: MaterialContext): boolean {
    if (item.location?.type === LocationType.Deck) return true;
    return super.isFlippedOnTable(item, context)
  }

  help = GameCardHelp

}

export const gameCardDescription = new GameCardDescription()
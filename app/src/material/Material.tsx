import { MaterialType } from '@gamepark/district-noir/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { firstPlayerTokenDescription } from './CampTokenDescription'
import { gameCardDescription } from './GameCardDescription'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
    [MaterialType.Card]: gameCardDescription,
    [MaterialType.CampToken]: firstPlayerTokenDescription,
}

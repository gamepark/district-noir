import { MaterialType } from '@gamepark/district-noir/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { gameCardDescription } from './GameCardDescription'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
    [MaterialType.Card]: gameCardDescription,
}

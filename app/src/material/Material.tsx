import { MaterialType } from '@gamepark/district-noir/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { GameCardDescription } from './GameCardDescription'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
    [MaterialType.Card]: GameCardDescription,
}

import { LocationType } from '@gamepark/district-noir/material/LocationType'
import { MaterialType } from '@gamepark/district-noir/material/MaterialType'
import { PlayerColor } from '@gamepark/district-noir/PlayerColor'
import { Locator } from '@gamepark/react-game'
import { gameDeckLocator } from './DeckLocator'
import { playerHandLocator } from './PlayerHandLocator'
import { playAreaLocator } from './PlayAreaLocator'
import { playerColumnsLocator } from './PlayerColumnsLocator'

export const Locators: Partial<Record<LocationType, Locator<PlayerColor, MaterialType, LocationType>>> = {
    [LocationType.Deck]: gameDeckLocator,
    [LocationType.Hand]: playerHandLocator,
    [LocationType.PlayArea]: playAreaLocator,
    [LocationType.PlayerColumns]: playerColumnsLocator
}

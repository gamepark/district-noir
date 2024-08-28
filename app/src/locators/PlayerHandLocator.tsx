import { LocationType } from '@gamepark/district-noir/material/LocationType'
import { HandLocator, ItemContext } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'
import { gameDeckLocator } from './DeckLocator'

export class PlayerHandLocator extends HandLocator {
    getCoordinates(location: Location, context: ItemContext): Coordinates {
        const player = context.player
        const players = context.rules.players
        const locationPlayer = location.player
        const bottomPlayer = player ?? players[0] 
        const isBottomPlayer = locationPlayer === bottomPlayer
        const { rules } = context
        const isEnded = rules.game.rule === undefined

        if (isBottomPlayer) {
            return {
                x: isEnded? gameDeckLocator.coordinates.x: -20,
                y:20,
                z:0,
            }    
        }
        
        return {
            x: isEnded? gameDeckLocator.coordinates.x: -20,
            y:-20,
            z:0,
        }
    }


    getHoverTransform(item: MaterialItem, context: ItemContext): string[] {
        if (item.location.type === LocationType.Hand && context.player !== item.location.player) return []
        const transform = super.getHoverTransform(item, context)
        transform.push('translateY(-25%)')
        return transform
    }

    getMaxAngle(location: Location, context: ItemContext) {
        const { rules } = context
        const isEnded = rules.game.rule === undefined
        if (!isEnded) return super.getMaxAngle(location, context)
        return 2
    }

    getBaseAngle(location: Location, context: ItemContext) {
        const player = context.player
        const players = context.rules.players
        const locationPlayer = location.player
        const bottomPlayer = player ?? players[0] 
        const isBottomPlayer = locationPlayer === bottomPlayer

        if (isBottomPlayer) return 0
        return 180
    }
    
}

export const playerHandLocator = new PlayerHandLocator()
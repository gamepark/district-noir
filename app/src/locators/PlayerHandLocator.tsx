import { HandLocator, ItemContext } from "@gamepark/react-game";
import { Location, Coordinates, MaterialItem } from "@gamepark/rules-api";
import { gameDeckLocator } from "./DeckLocator";

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

    getMaxAngle(item: MaterialItem, context: ItemContext) {
        const { rules } = context
        const isEnded = rules.game.rule === undefined
        if (!isEnded) return super.getMaxAngle(item, context)
        return 2
    }

    getBaseAngle(item: MaterialItem, context: ItemContext) {
        const player = context.player
        const players = context.rules.players
        const locationPlayer = item.location.player
        const bottomPlayer = player ?? players[0] 
        const isBottomPlayer = locationPlayer === bottomPlayer

        if (isBottomPlayer) return 0
        return 180
    }
    
}

export const playerHandLocator = new PlayerHandLocator()
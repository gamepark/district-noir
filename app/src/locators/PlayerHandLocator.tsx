import { HandLocator, ItemContext } from "@gamepark/react-game";
import { Location, Coordinates, MaterialItem } from "@gamepark/rules-api";

export class PlayerHandLocator extends HandLocator {
    getCoordinates(location: Location, context: ItemContext): Coordinates {
        const player = context.player
        const players = context.rules.players
        const locationPlayer = location.player
        const bottomPlayer = player ?? players[0] 
        const isBottomPlayer = locationPlayer === bottomPlayer

        if (isBottomPlayer) {
            return {
                x:-20,
                y:20,
                z:0,
            }    
        }
        
        return {
            x:-20,
            y:-20,
            z:0,
        }
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
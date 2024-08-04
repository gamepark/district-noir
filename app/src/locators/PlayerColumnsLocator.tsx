import { ItemContext, LineLocator } from "@gamepark/react-game";
import { MaterialItem, Coordinates } from "@gamepark/rules-api";
import { gameCardDescription } from "../material/GameCardDescription";

export class PlayerColumnsLocator extends LineLocator {

    getDelta(item: MaterialItem, { rules, player }: ItemContext<number, number, number>): Partial<Coordinates> {
        if (item.location.player === (player ?? rules.players[0])) {
            return { x: 0, y: 2, z: 0.05 }
        }


        return { x: 0, y: -2, z: 0.05 }
    }

    getCoordinates(item: MaterialItem, context: ItemContext): Coordinates {
        const locationId = item.location.id
        const column = this.getColumnForLocationId(locationId)
        const player = context.player
        const players = context.rules.players
        const locationPlayer = item.location.player
        const bottomPlayer = player ?? players[0] 
        const isBottomPlayer = locationPlayer === bottomPlayer
    
        return {
            x: 5 + (column * (gameCardDescription.width + 0.2)),
            y: isBottomPlayer? 13: -13,
            z: 0
        }
    }

    getColumnForLocationId(id: number) {
        if (id === 5) return 0
        if (id === 6) return 1
        if (id === 7) return 2
        if (id === 8) return 3
        if (id === 10) return 4
        if (id === 20) return 5
        if (id === 30) return 6
        return -1
    }

}

export const playerColumnsLocator = new PlayerColumnsLocator()
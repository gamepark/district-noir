import { ItemContext, LineLocator } from "@gamepark/react-game";
import { MaterialItem, Coordinates } from "@gamepark/rules-api";
import { gameCardDescription } from "../material/GameCardDescription";
import { PlayerColumnsDescription } from "./Description/PlayerColumnsDescription";

export class PlayerColumnsLocator extends LineLocator {

    locationDescription = new PlayerColumnsDescription()

    getDelta(item: MaterialItem, { rules, player }: ItemContext<number, number, number>): Partial<Coordinates> {
        if (item.location.player === (player ?? rules.players[0])) {
            return { x: 0, y: 2, z: 0.05 }
        }


        return { x: 0, y: -2, z: 0.05 }
    }

    getCoordinates(item: MaterialItem, context: ItemContext): Coordinates {
        const locationId = item.location.id
        const column = this.locationDescription.getColumnForLocationId(locationId)
        const player = context.player
        const players = context.rules.players
        const locationPlayer = item.location.player
        const bottomPlayer = player ?? players[0] 
        const isBottomPlayer = locationPlayer === bottomPlayer
        const { rules } = context
        const isEnded = rules.game.rule === undefined
        const baseX = isEnded? (-18.5 + (item.location.id >= 10? (gameCardDescription.width + 0.2): 0)): 5 
        return {
            x: baseX + (column * (gameCardDescription.width + 0.2)),
            y: isBottomPlayer? 13: -13,
            z: 0
        }
    }

}

export const playerColumnsLocator = new PlayerColumnsLocator()
import { ItemContext, LineLocator } from "@gamepark/react-game";
import { MaterialItem, Coordinates } from "@gamepark/rules-api";

export class PlayerColumnsLocator extends LineLocator {

    getDelta(item: MaterialItem, { rules, player }: ItemContext<number, number, number>): Partial<Coordinates> {
        if (item.location.player === (player ?? rules.players[0])) {
            return { x: 0, y: 2, z: 0.05 }
        }


        return { x: 0, y: -2, z: 0.05 }
    }

    getCoordinates(_item: MaterialItem, _context: ItemContext): Coordinates {
        return {
            x: 0,
            y: 0,
            z: 0
        }
    }

}

export const playerColumnsLocator = new PlayerColumnsLocator()
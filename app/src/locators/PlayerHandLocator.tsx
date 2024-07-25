import { HandLocator, ItemContext } from "@gamepark/react-game";
import { Location, Coordinates } from "@gamepark/rules-api";

export class PlayerHandLocator extends HandLocator {
    getCoordinates(_location: Location, _context: ItemContext): Coordinates {
        return {
            x:0,
            y:0,
            z:0,
        }
    }
    
}
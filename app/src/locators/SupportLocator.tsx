import { ItemContext, LineLocator } from "@gamepark/react-game";
import { Coordinates, MaterialItem } from "@gamepark/rules-api";

export class SupportLocator extends LineLocator {
    getCoordinates(_item: MaterialItem, _context: ItemContext): Coordinates {
        return {
            x:0,
            y:0,
            z:0,
        }
    }
    
}
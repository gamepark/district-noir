import { ItemContext, ListLocator } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'

export class SupportLocator extends ListLocator {
    getCoordinates(_location: Location, _context: ItemContext): Coordinates {
        return {
            x:0,
            y:0,
            z:0,
        }
    }
    
}
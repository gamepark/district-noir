import { LocationType } from '@gamepark/district-noir/material/LocationType'
import { LocationDescription } from '@gamepark/react-game'
//import { CardDescription } from '../../material/DeckDescription'

export class PlayerAreaDescription extends LocationDescription {
    location = { type: LocationType.PlayArea }
    //width = (CardDescription.width * 2) + 15
    //height = CardDescription.height + 10
    //borderRadius = CardDescription.borderRadius + 1
    coordinates = { x: -6.9, y: 0, z: 0.1 }

}
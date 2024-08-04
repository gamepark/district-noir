import { DeckLocator } from "@gamepark/react-game";

export class GameDeckLocator extends DeckLocator {    
    delta = { x: -0.05, y: -0.05, z: 0.05}
    hidden = true
    
  coordinates = {x: -40, y: 0, z: 0}
}

export const gameDeckLocator = new GameDeckLocator()
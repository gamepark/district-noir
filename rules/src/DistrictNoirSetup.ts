import { MaterialGameSetup, MaterialItem } from '@gamepark/rules-api'
import { DistrictNoirOptions } from './DistrictNoirOptions'
import { DistrictNoirRules } from './DistrictNoirRules'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor } from './PlayerColor'
import { RuleId } from './rules/RuleId'
import { Card } from './material/Card'
import times from 'lodash/times'

/**
 * This class creates a new Game based on the game options
 */
export class DistrictNoirSetup extends MaterialGameSetup<PlayerColor, MaterialType, LocationType, DistrictNoirOptions> {
  Rules = DistrictNoirRules

  setupMaterial(_options: DistrictNoirOptions) {
    this.setupCards()
    this.setupPlayers()
    this.setupPlayArea()
    this.material(MaterialType.CampToken).createItem({
      location: {
        type: LocationType.CampToken,
        rotation: false
      }
    })
    }

  setupCards() {
    this.createItems(5, Card.Support5)
    this.createItems(6, Card.Support6)
    this.createItems(7, Card.Support7)
    this.createItems(8, Card.Support8)

    this.createItems(4, Card.Alliance2)
    this.createItems(2, Card.Alliance3)
    this.createItems(1, Card.Alliance4)

    this.createItems(3, Card.Betrayal1)
    this.createItems(4, Card.Betrayal2)    
    this.createItems(2, Card.Betrayal3)

    this.createItems(1, Card.CityHall)
    this.createItems(1, Card.PoliceDepartment)
    this.createItems(1, Card.TheDocks)

    this.material(MaterialType.Card).shuffle()
    this.material(MaterialType.Card).limit(3).deleteItems()
  }

  setupPlayArea() {
    this
      .material(MaterialType.Card)
      .location(LocationType.Deck)
      .limit(2)
      .moveItems({
        type: LocationType.PlayArea
      })
  }

  setupPlayers() {
    const deck = this.material(MaterialType.Card).location(LocationType.Deck).deck()
    for (const player of this.players) {
      deck.deal({
        type: LocationType.Hand,
        player: player
      }, 5)
    }
  }
  
  createItems(count: number, id: Card) {
    const cards: MaterialItem[] = times(count, () => ({ 
         id: id,
         location: {
           type: LocationType.Deck
         }
       })
     )
   
     this.material(MaterialType.Card).createItems(cards)
  }

  start() {
    this.startPlayerTurn(RuleId.PlayerTurn, this.game.players[0])
  }
}
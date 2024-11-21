import { DistrictNoirSetup } from '@gamepark/district-noir/DistrictNoirSetup'
import { Card, isCity } from '@gamepark/district-noir/material/Card'
import { LocationType } from '@gamepark/district-noir/material/LocationType'
import { MaterialType } from '@gamepark/district-noir/material/MaterialType'
import { PlayerColor } from '@gamepark/district-noir/PlayerColor'


export const me = PlayerColor.Black
export const opponent = PlayerColor.White

const myHand = [Card.Support6, Card.Support6, Card.Betrayal1, Card.Support5, Card.Alliance2]
const opponentHand = [Card.Support7, Card.Support8, Card.TheDocks, Card.Alliance4, Card.Betrayal2]

export class TutorialSetup extends DistrictNoirSetup {

  deleteCards() {
    this.material(MaterialType.Card)
      .id((id: Card) => !isCity(id))
      .limit(3)
      .deleteItems()
  }

  setupPlayArea() {
    this.material(MaterialType.Card)
      .location(LocationType.Deck)
      .deck()
      .id(Card.Support5)
      .moveItem({
        type: LocationType.PlayArea
      })

    this.material(MaterialType.Card)
      .location(LocationType.Deck)
      .deck()
      .id(Card.Betrayal2)
      .moveItem({
        type: LocationType.PlayArea
      })
  }

  setupPlayer(player: PlayerColor) {
    if (player === me) {
      for (const card of myHand) {
        this.material(MaterialType.Card).location(LocationType.Deck).deck()
          .id(card)
          .dealOne({
            type: LocationType.Hand,
            player: me
          })
      }
    } else {
      for (const card of opponentHand) {
        this.material(MaterialType.Card).location(LocationType.Deck).deck()
          .id(card)
          .dealOne({
            type: LocationType.Hand,
            player: opponent
          })
      }
    }
  }
}
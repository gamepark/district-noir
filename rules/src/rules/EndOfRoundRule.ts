import { MaterialMove, MaterialRulesPart } from "@gamepark/rules-api"
import { LocationType } from "../material/LocationType"
import { RuleId } from "./RuleId"
import { MaterialType } from "../material/MaterialType"
import { Memory } from "./Memory"

export class EndOfRoundRule extends MaterialRulesPart {
    onRuleStart() {
        const moves: MaterialMove[] = []
        if (this.deck.length === 0) return [this.endGame()]
        moves.push(...this.refillPlayerHand())
        moves.push(...this.changeFirstPlayer())
        return moves
    }

    refillPlayerHand() {
        const deck = this.deck
        const moves: MaterialMove[] = []
        for (const player of this.game.players) {
            moves.push(
                ...deck.deal({
                    type: LocationType.Hand,
                    player: player
                }, 5)
            )
        }

        return moves
    }

    get deck() {
        return this
            .material(MaterialType.Card)
            .location(LocationType.Deck)
            .deck()
    }

    changeFirstPlayer() {
        const moves: MaterialMove[] = []
        const token = this.campToken
        const nextFirstPlayer =  !token.getItem()!.location.rotation? this.game.players[1]: this.game.players[0]
        moves.push(
            token.moveItem((item) => ({
                type: LocationType.CampToken,
                rotation: !item.location.rotation
            }))
        )
        moves.push(this.startPlayerTurn(RuleId.PlayerTurn, nextFirstPlayer))
        return moves
    }

    get campToken() {
        return this.material(MaterialType.CampToken)
    }

    onRuleEnd() {
        this.forget(Memory.HasTaken)
        return []
    }
}
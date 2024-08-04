import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { RuleId } from './RuleId'
import { CustomMoveType } from './CustomMoveType'
import { Card } from '../material/Card'
import { Memory } from './Memory'

export class PlayerActionRule extends PlayerTurnRule {
  getPlayerMoves() {
    const moves: MaterialMove[] = []
    if (this.canTake) {
      moves.push(this.customMove(CustomMoveType.Take))
    }      

    moves.push(
      ...this
        .hand
        .moveItems({
          type: LocationType.PlayArea
        })
    )

    return moves
  }

  get hand() {
    return this
        .material(MaterialType.Card)
        .location(LocationType.Hand)
        .player(this.player)
  }

  onCustomMove() {
    const moves: MaterialMove[] = []
    this.memorize(Memory.HasTaken, true, this.player)    
    moves.push(
      ...this
        .lastFiveCards
        .moveItems((item) => ({
          type: LocationType.PlayerColumns,
          id: item.id <= Card.Support8? item.id: (Math.floor(item.id / 10) * 10),
          player: this.player
        }))
     )

    moves.push(this.goToNext())
    return moves
  }

  afterItemMove(move: ItemMove) {
    const moves: MaterialMove[] = []
    if (!isMoveItemType(MaterialType.Card)(move) || move.location.type !== LocationType.PlayArea) return []
    moves.push(this.goToNext())
    return moves
  }

  goToNext() {
    if (this.isVictoryTriggered) {
      return this.endGame()
    }

    if (this.isEndOfRound) {
      return this.startRule(RuleId.EndOfRound)
    }

    return this.startPlayerTurn(RuleId.PlayerTurn, this.nextPlayer)
  }

  get isEndOfRound() {
    return (
      this
        .material(MaterialType.Card)
        .location(LocationType.Hand)
        .length === 0
      && this.game.players.every((player) => this.remind(Memory.HasTaken, player))  
    )

  }

  get lastFiveCards() {
    return this
      .material(MaterialType.Card)
      .location(LocationType.PlayArea)
      .sort((item) => -item.location.x!)
      .limit(5)
  }

  get isVictoryTriggered() {
      return false
  }

  get canTake() {
    return !this.remind(Memory.HasTaken, this.player) && this.lastFiveCards.length > 0
  }
}
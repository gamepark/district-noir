import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { RuleId } from './RuleId'
import { CustomMoveType } from './CustomMoveType'
import { Card, isCity } from '../material/Card'
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
    const lastFiveCards = this.lastFiveCards
    moves.push(
      ...lastFiveCards
        .moveItems((item) => ({
          type: LocationType.PlayerColumns,
          id: item.id <= Card.Support8? item.id: (Math.floor(item.id / 10) * 10),
          player: this.player
        }))
     )

     const cities = this.cities.length
     const takenCities = lastFiveCards.filter((item) => isCity(item.id)).length
     if (cities + takenCities === 3) {
       moves.push(this.endGame())
     } else {
      moves.push(this.goToNext())
     }
    
    return moves
  }

  afterItemMove(move: ItemMove) {
    const moves: MaterialMove[] = []
    if (!isMoveItemType(MaterialType.Card)(move) || move.location.type !== LocationType.PlayArea) return []
    moves.push(this.goToNext())
    return moves
  }

  goToNext() {
    if (this.isEndOfRound) {
      return this.startRule(RuleId.EndOfRound)
    }

    return this.startPlayerTurn(RuleId.PlayerTurn, this.nextPlayer)
  }

  get isEndOfRound() {
    const hasAllTaken = this.game.players.every((player) => this.remind(Memory.HasTaken, player))
    if (!this.deck.length && hasAllTaken) {
      return true
    }
    return (
      this.hands.length === 0
      && hasAllTaken
    )

  }

  get hands() {
    return this
      .material(MaterialType.Card)
      .location(LocationType.Hand)
  }

  get deck() {
    return this
      .material(MaterialType.Card)
      .location(LocationType.Deck)
      .deck()
  }

  get lastFiveCards() {
    return this
      .material(MaterialType.Card)
      .location(LocationType.PlayArea)
      .sort((item) => -item.location.x!)
      .limit(5)
  }

  get isVictoryTriggered() {
    return this.cities.length === 3
  }

  get cities() {
    return this
      .material(MaterialType.Card)
      .location(LocationType.PlayerColumns)
      .player(this.player)
      .id((id: number) => isCity(id))
  }

  get canTake() {
    return !this.remind(Memory.HasTaken, this.player) && this.lastFiveCards.length > 0
  }
}
import { MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import keys from 'lodash/keys'
import minBy from 'lodash/minBy'
import sum from 'lodash/sum'
import sumBy from 'lodash/sumBy'
import { Card, isCity, isSupport, supports } from '../../material/Card'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'

export class ScoringHelper extends MaterialRulesPart {
    constructor(game: MaterialGame, readonly player: number) {
        super(game)
    }

    get colums() {
        return this
            .material(MaterialType.Card)
            .location(LocationType.PlayerColumns)
            .player(this.player)
    }

    get opponentColumns() {
        return this
            .material(MaterialType.Card)
            .location(LocationType.PlayerColumns)
            .player((p) => p !== this.player)
    }

    getColumnCards(id: number) {
        return this.colums.locationId(id)
    }

    get supportCards() {
        return this.colums.locationId((id: number) => isSupport(id)).getItems()
    }

    get linesScore() {
        const cards = this.supportCards
        const cardsByKey: Partial<Record<Card, number>> = {}
        for (const type of supports) {
            cardsByKey[type] = cards.filter((item) => item.id === type).length
        }

        const minKey = minBy(keys(cardsByKey), (key) => cardsByKey[+key])
        if (!minKey) return 0
        return cardsByKey[minKey] * 5
    }

    getOpponentColumnCards(id: number) {
        return this.opponentColumns.locationId(id)
    }

    getColumnScore(id: number) {
        // item.id <= Card.Support8? item.id: (Math.floor(item.id / 10) * 10),

        if (id <= Card.Support8) {
            const myCards = this.getColumnCards(id)
            const opponentCards = this.getOpponentColumnCards(id)
            if (opponentCards.length >= myCards.length) return 0
            return id
        } else if (id === 9) {
            return this.linesScore
        } else if (id === 10) {
            const myCards = this.getColumnCards(id)
            return sumBy(myCards.getItems(), (item) => item.id % 10)
        } else if (id === 20) {
            const myCards = this.getColumnCards(id)
            return -sumBy(myCards.getItems(), (item) => (item.id % 10))
        }

        return 0
    }

    //get FullLine() {
        //return this
          //  .colums 
   // }

    get cities() {
        return this
            .colums
            .id((id: number) => isCity(id))
    }

    get opponentCities() {
        return this
            .opponentColumns
            .id((id: number) => isCity(id))
    }

    get score() {
        if (this.cities.length === 3) return 99
        if (this.opponentCities.length === 3) return 0
        return sum(
            [5, 6, 7, 8, 9, 10, 20].map((id) => this.getColumnScore(id))
        )
    }
}
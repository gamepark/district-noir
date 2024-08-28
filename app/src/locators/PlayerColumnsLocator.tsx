import { css } from '@emotion/react'
import { LocationType } from '@gamepark/district-noir/material/LocationType'
import { MaterialType } from '@gamepark/district-noir/material/MaterialType'
import { isItemContext, ItemContext, ListLocator, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { gameCardDescription } from '../material/GameCardDescription'
import { PlayerColumnScoring } from './components/PlayerColumnScoring'

export class PlayerColumnsLocator extends ListLocator {

    getGap(location: Location, { rules, player }: ItemContext<number, number, number>): Partial<Coordinates> {
        if (location.player === (player ?? rules.players[0])) {
            return { x: 0, y: 2, z: 0.05 }
        }


        return { x: 0, y: -2, z: 0.05 }
    }

    getCoordinates(location: Location, context: MaterialContext): Coordinates {
        const locationId = location.id
        const column = this.getColumnForLocationId(locationId)
        const player = context.player
        const players = context.rules.players
        const locationPlayer = location.player
        const bottomPlayer = player ?? players[0] 
        const isBottomPlayer = locationPlayer === bottomPlayer
        const { rules } = context
        const isEnded = rules.game.rule === undefined
        const baseX = isEnded? -24.5: 5
        return {
            x: baseX + (column * (gameCardDescription.width + 2)),
            y: isBottomPlayer? 13: -13,
            z: 0
        }
    }

    getLocationCoordinates(location: Location, context: MaterialContext, index?: number) {
        if (isItemContext(context)) return super.getLocationCoordinates(location, context, index)
        const locationId = location.id
        const column = this.getColumnForLocationId(locationId)
        const player = context.player
        const players = context.rules.players
        const locationPlayer = location.player
        const bottomPlayer = player ?? players[0]
        const isBottomPlayer = locationPlayer === bottomPlayer
        const { rules } = context
        const isEnded = rules.game.rule === undefined
        const baseX = isEnded? -24.5: 5
        return {
            x: baseX + (column * (gameCardDescription.width + 2)),
            y: isBottomPlayer? 3: -3,
            z: 0
        }
    }

    getLocations(context: MaterialContext) {
        const { rules } = context
        const isEnded = rules.game.rule === undefined
        if (!isEnded) return []
        const winByCities = rules.players.some((p) => rules.material(MaterialType.Card).location(LocationType.PlayerColumns).player(p).locationId(30).length === 3)
        if (winByCities) {
            return rules.game.players.map((p) => ({
                type: LocationType.PlayerColumns,
                player: p,
                id: 30
            }))
        }

        return rules.game.players.flatMap((p) => [
            { type: LocationType.PlayerColumns, player: p, id: 5 },
            { type: LocationType.PlayerColumns, player: p, id: 6 },
            { type: LocationType.PlayerColumns, player: p, id: 7 },
            { type: LocationType.PlayerColumns, player: p, id: 8 },
            { type: LocationType.PlayerColumns, player: p, id: 9 }, // FAKE LOCATION FOR LINES
            { type: LocationType.PlayerColumns, player: p, id: 10 },
            { type: LocationType.PlayerColumns, player: p, id: 20 },
            { type: LocationType.PlayerColumns, player: p, id: 99 } // TOTAL
        ])
    }

    getColumnForLocationId(id: number) {
        if (id === 5) return 0
        if (id === 6) return 1
        if (id === 7) return 2
        if (id === 8) return 3
        if (id === 9) return 4
        if (id === 10) return 5
        if (id === 20) return 6
        if (id === 30) return 7
        if (id === 99) return 8
        return -1
    }

    locationDescription = new PlayerColumnsDescription({ height: 5, width: 5 })

}

class PlayerColumnsDescription extends LocationDescription {

    extraCss = css`
        cursor: default;
        &:hover {
            cursor: default;
            background-color: unset !important;
        }
    `

    content = PlayerColumnScoring
}

export const playerColumnsLocator = new PlayerColumnsLocator()
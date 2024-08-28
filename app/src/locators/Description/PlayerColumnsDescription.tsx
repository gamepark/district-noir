import { LocationType } from "@gamepark/district-noir/material/LocationType";
import { LocationContext, LocationDescription, MaterialContext } from "@gamepark/react-game";
import { gameCardDescription } from "../../material/GameCardDescription";
import { PlayerColumnScoring } from "../components/PlayerColumnScoring";
import { Location } from "@gamepark/rules-api";
import { MaterialType } from "@gamepark/district-noir/material/MaterialType";
import { css } from "@emotion/react";

export class PlayerColumnsDescription extends LocationDescription{
    alwaysVisible = true
    height = 5
    width = 5
    borderRadius = 5

    extraCss = css`
        cursor: default;
        &:hover {
            cursor: default;
            background-color: unset !important;
        }
    `

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
            { type: LocationType.PlayerColumns, player: p, id: 10 },
            { type: LocationType.PlayerColumns, player: p, id: 20 }
        ])        
    }

    getCoordinates(location: Location, context: LocationContext) {
    
        const locationId = location.id
        const column = this.getColumnForLocationId(locationId)
        const player = context.player
        const players = context.rules.players
        const locationPlayer = location.player
        const bottomPlayer = player ?? players[0] 
        const isBottomPlayer = locationPlayer === bottomPlayer
        const { rules } = context
        const isEnded = rules.game.rule === undefined
        const baseX = isEnded? -18.5: 5 
        return {
            x: baseX + (column * (gameCardDescription.width + 0.2)),
            y: isBottomPlayer? 3: -3,
            z: 0
        }
    }

    getColumnForLocationId(id: number) {
        if (id === 5) return 0
        if (id === 6) return 1
        if (id === 7) return 2
        if (id === 8) return 3
        if (id === 10) return 4
        if (id === 20) return 5
        if (id === 30) return 6
        return -1
    }

    content = PlayerColumnScoring
}
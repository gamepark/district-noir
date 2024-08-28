/** @jsxImportSource @emotion/react */

import { DistrictNoirRules } from "@gamepark/district-noir/DistrictNoirRules"
import { ScoringHelper } from '@gamepark/district-noir/rules/helper/ScoringHelper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck'
import { playerColumnsLocator } from "../PlayerColumnsLocator"
import { useRules } from "@gamepark/react-game"
import { css, keyframes } from "@emotion/react"
import { FC } from "react"
import { Location } from "@gamepark/rules-api"
import { MaterialType } from "@gamepark/district-noir/material/MaterialType"
import { LocationType } from "@gamepark/district-noir/material/LocationType"


type PlayerColumnScoringProps = {
    location: Location
  }

export const PlayerColumnScoring: FC<PlayerColumnScoringProps> = (props) => {
    const { location } = props
    const rules = useRules<DistrictNoirRules>()!
    const id = playerColumnsLocator.locationDescription.getColumnForLocationId(location.id)
    const columnScore = new ScoringHelper(rules.game, location.player!).getColumnScore(location.id)
    if (location.id === 30) {
      const iWinByCities = rules.material(MaterialType.Card).location(LocationType.PlayerColumns).player(location.player!).locationId(30).length === 3
      if (iWinByCities) {
        return (
          <div css={[scoreItem]}>
              <span><FontAwesomeIcon icon={faCheck} css={css`font-weight: bold; color: green;`} /></span>      
          </div>
        )
      } else {
        return null
      }
    }

    return (
        <div css={[scoreItem, appearing(id * 2)]}>
            <span>{columnScore}</span>      
        </div>
    )

}


const appearingKeyFrame = keyframes`
  0% {
    opacity: 0;
  }
  50%, 100% {
    opacity: 1;
  }
`

const scoreItem = css`
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: silver;
    border-radius: 5em;
    border: 0.2em solid gold;
    box-shadow: 0 0 0.1em black, 0 0 0.1em black;
    display: flex;
    align-items: center;
    justify-content: center;
    color: black;
    pointer-event: none;

    > span {
        font-size: 2em; 
    }
`

const appearing = (delay: number = 0) => css`
    opacity: 0;
    animation: 2s ${appearingKeyFrame} ${delay}s linear forwards;
`


/** @jsxImportSource @emotion/react */

import { css, keyframes } from '@emotion/react'
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DistrictNoirRules } from '@gamepark/district-noir/DistrictNoirRules'
import { LocationType } from '@gamepark/district-noir/material/LocationType'
import { MaterialType } from '@gamepark/district-noir/material/MaterialType'
import { ScoringHelper } from '@gamepark/district-noir/rules/helper/ScoringHelper'
import { usePlayerId, useRules } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { FC } from 'react'
import { playerColumnsLocator } from '../PlayerColumnsLocator'


type PlayerColumnScoringProps = {
  location: Location
}

export const PlayerColumnScoring: FC<PlayerColumnScoringProps> = (props) => {
  const { location } = props
  const rules = useRules<DistrictNoirRules>()!
  const id = playerColumnsLocator.getColumnForLocationId(location.id)
  const player = usePlayerId()
  const helper = new ScoringHelper(rules.game, location.player!)
  const bottomPlayer = player ?? rules.players[0]
  const isBottomPlayer = location.player === bottomPlayer
  console.log(isBottomPlayer)
  const iWinByCities = rules.material(MaterialType.Card).location(LocationType.PlayerColumns).player(location.player!).locationId(30).length === 3
  if (iWinByCities) {
    if (location.id === 30) {
      return (
        <>
          <div css={[scoreItem]}>
          <span><FontAwesomeIcon icon={faCheck} css={css`font-weight: bold;
            color: green;`}/></span>
          </div>
        </>
      )
    } else {
      return null
    }
  }

  if (location.id === 9) {
    const lineCount = helper.linesScore / 5
    return (
      <>
        <div css={[scoreItem, appearing(id * 1)]}>
          <span>{helper.linesScore}</span>
        </div>
        {lineCount && (
          <div css={[isBottomPlayer ? bottomVerticalLineCss(lineCount - 1) : topVerticalLineCss(lineCount - 1), appearing(id * 1)]}></div>
        )}
        {
          Array.from(Array(lineCount)).map((_, i) => (
            <div
              key={i}
              css={[isBottomPlayer ? bottomLine(i) : topLine(i), appearing(id * 1)]}
            />
          ))
        }
        <div css={plusCss}>+</div>
      </>
    )
  }

  return (
    <>
      <div css={[scoreItem, appearing((id === 8? 7: id) * 1)]}>
        {id < 8 && <span>{Math.abs(helper.getColumnScore(location.id))}</span>}
        {id === 8 && <span>{helper.score}</span>}
      </div>
      {id === 6 && <div css={equalCss}>=</div>}
      {id < 4 && <div css={plusCss}>+</div>}
      {id === 5 && <div css={plusCss}>-</div>}
    </>
  )

}

const equalCss = css`
  font-size: 3em;
  transform: translate(3.2em, 0.2em);
`

const plusCss = css`
  font-size: 3em;
  transform: translate(1.9em, 0.2em);
`

const bottomVerticalLineCss = (count: number) => css`
  border-left: 0.2em solid white;
  height: ${2.9 + count * 2.2}em;
  position: absolute;
  top: 100%;
  transform: translate3d(2.48em, 0, 0);
`

const topVerticalLineCss = (count: number) => css`
  border-left: 0.2em solid white;
  height: ${2.9 + count * 2.2}em;
  position: absolute;
  bottom: 100%;
  transform: translate3d(2.48em, 0, 0);
`

const bottomLine = (index: number) => css`
  border-bottom: 0.2em solid white;
  transform: translateX(-1em) translateY(${8 + (index * 1.8)}em);
  width: 7em;
`

const topLine = (index: number) => css`
  border-bottom: 0.2em solid white;
  transform: translateX(-1em) translateY(-${3 + (index * 1.8)}em);
  width: 7em;
`

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
  transform: translateZ(1em);

  > span {
    font-size: 2em;
  }
`

const appearing = (delay: number = 0) => css`
  opacity: 0;
  animation: 2s ${appearingKeyFrame} ${delay}s linear forwards;
`


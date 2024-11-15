import { Card, isAlliance, isBetrayal, isCity, isSupport } from '@gamepark/district-noir/material/Card'
import { LocationType } from '@gamepark/district-noir/material/LocationType'
import { MaterialType } from '@gamepark/district-noir/material/MaterialType'
import { MaterialHelpProps, useRules } from '@gamepark/react-game'
import { MaterialRules } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'

export const GameCardHelp: FC<MaterialHelpProps> = (props) => {
  const { item } = props
  const rules = useRules<MaterialRules>()!
  return (
    <>
      <h2><Trans defaults={getCardName(item.id)}/></h2>
      {isAlliance(item.id) && (
        <p>
          <Trans defaults="alliance.purpose" values={{ points: item.id % 10 }}/>
        </p>
      )}
      {isSupport(item.id) && (
        <p>
          <Trans defaults="supporter.purpose" values={{ points: item.id }}/>
        </p>
      )}
      {isBetrayal(item.id) && (
        <p>
          <Trans defaults="betrayal.purpose" values={{ points: item.id % 10 }}/>
        </p>
      )}
      {isCity(item.id) && (
        <>
          <p>
            <Trans defaults="city.purpose"/>
          </p>
          <p>
            <Trans defaults="city.three"/>
          </p>
          {Card.PoliceDepartment === item.id && (
            <p>
              <Trans defaults="city.policedepartment"/>
            </p>
          )}
          {Card.CityHall === item.id && (
            <p>
              <Trans defaults="city.cityhall"/>
            </p>
          )}
          {Card.TheDocks === item.id && (
            <p>
              <Trans defaults="city.dock"/>
            </p>
          )}
          <p>
            <Trans defaults="city.wincondition"/>
          </p>
        </>
      )}
      {item.location?.type === LocationType.Deck && (
        <p>
          <Trans defaults="deck.size" values={{ number: rules.material(MaterialType.Card).location(LocationType.Deck).length }}/>
        </p>
      )}
    </>
  )
}

const getCardName = (card: Card) => {
  if (card === undefined) return 'card'
  if (isCity(card)) return 'city'
  if (isBetrayal(card)) return 'betrayal'
  if (isAlliance(card)) return 'alliance'
  return 'supporter'
}
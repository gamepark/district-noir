import { Card, isAlliance, isBetrayal, isCity, isSupport } from '@gamepark/district-noir/material/Card'
import { MaterialHelpProps } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans } from 'react-i18next'

export const GameCardHelp: FC<MaterialHelpProps> = (props) => {
  const { item } = props

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
          <p>
            <Trans defaults="city.cityhall"/>
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
    </>
  )
}

const getCardName = (card: Card) => {
  if (isCity(card)) return 'city'
  if (isBetrayal(card)) return 'betrayal'
  if (isAlliance(card)) return 'alliance'
  return 'supporter'
}
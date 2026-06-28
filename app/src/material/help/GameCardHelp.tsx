import { Card, isAlliance, isBetrayal, isCity, isSupport } from '@gamepark/district-noir/material/Card'
import { LocationType } from '@gamepark/district-noir/material/LocationType'
import { MaterialType } from '@gamepark/district-noir/material/MaterialType'
import { MaterialHelpProps, useRules } from '@gamepark/react-game'
import { MaterialRules } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'

export const GameCardHelp: FC<MaterialHelpProps> = (props) => {
  const { item } = props
  const { t } = useTranslation()
  const rules = useRules<MaterialRules>()!
  return (
    <>
      <h2>
        <Trans
          i18nKey={getCardName(item.id)}
          values={isCity(item.id) ? { city: t(`city.${item.id}`) } : undefined}
        />
      </h2>
      {isAlliance(item.id) && (
        <p>
          <Trans i18nKey="alliance.purpose" values={{ points: item.id % 10 }}/>
        </p>
      )}
      {isSupport(item.id) && (
        <p>
          <Trans i18nKey="supporter.purpose" values={{ points: item.id }}/>
        </p>
      )}
      {isBetrayal(item.id) && (
        <p>
          <Trans i18nKey="betrayal.purpose" values={{ points: item.id % 10 }}/>
        </p>
      )}
      {isCity(item.id) && (
        <p>
          <Trans i18nKey="city.purpose"/>
        </p>
      )}
      {item.location?.type === LocationType.Deck && (
        <p>
          <Trans i18nKey="deck.size" values={{ number: rules.material(MaterialType.Card).location(LocationType.Deck).length }}/>
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
import { MaterialHelpProps } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'

export const CampHelp: FC<MaterialHelpProps> = () => {
  const { t } = useTranslation()
  return (
    <>
      <h2>{ t('camp') }</h2>
      <p>
        <Trans defaults="camp.token" />
      </p>
    </>
  )
}
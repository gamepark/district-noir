/** @jsxImportSource @emotion/react */
import { DistrictNoirOptionsSpec } from '@gamepark/district-noir/DistrictNoirOptions'
import { DistrictNoirRules } from '@gamepark/district-noir/DistrictNoirRules'
import { DistrictNoirSetup } from '@gamepark/district-noir/DistrictNoirSetup'
import { GameProvider, MaterialGameAnimations, setupTranslation } from '@gamepark/react-game'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Locators } from './locators/Locators'
import { Material } from './material/Material'
import translations from './translations.json'

setupTranslation(translations, { debug: false })

ReactDOM.render(
  <StrictMode>
    <GameProvider game="district-noir" Rules={DistrictNoirRules} optionsSpec={DistrictNoirOptionsSpec} GameSetup={DistrictNoirSetup}
                  material={Material} locators={Locators} animations={new MaterialGameAnimations()}>
      <App/>
    </GameProvider>
  </StrictMode>,
  document.getElementById('root')
)

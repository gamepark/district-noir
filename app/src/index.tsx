/** @jsxImportSource @emotion/react */
import { DistrictNoirOptionsSpec } from '@gamepark/district-noir/DistrictNoirOptions'
import { DistrictNoirRules } from '@gamepark/district-noir/DistrictNoirRules'
import { DistrictNoirSetup } from '@gamepark/district-noir/DistrictNoirSetup'
import { GameProvider, setupTranslation } from '@gamepark/react-game'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { gameAnimations } from './animations/GameAnimations'
import App from './App'
import { Locators } from './locators/Locators'
import { Material } from './material/Material'
import translations from './translations.json'
import { Tutorial } from './tutorial/Tutorial'

setupTranslation(translations, { debug: false })

ReactDOM.render(
  <StrictMode>
    <GameProvider
      game="district-noir"
      Rules={DistrictNoirRules}
      optionsSpec={DistrictNoirOptionsSpec}
      GameSetup={DistrictNoirSetup}
      material={Material}
      locators={Locators}
      animations={gameAnimations}
      tutorial={new Tutorial()}
    >
      <App/>
    </GameProvider>
  </StrictMode>,
  document.getElementById('root')
)

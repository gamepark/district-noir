import { DistrictNoirOptionsSpec } from '@gamepark/district-noir/DistrictNoirOptions'
import { DistrictNoirRules } from '@gamepark/district-noir/DistrictNoirRules'
import { DistrictNoirSetup } from '@gamepark/district-noir/DistrictNoirSetup'
import { GameProvider } from '@gamepark/react-game'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { gameAnimations } from './animations/GameAnimations'
import { App } from './App'
import { Locators } from './locators/Locators'
import { Material } from './material/Material'
import { scoring } from './Scoring'
import { Tutorial } from './tutorial/Tutorial'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameProvider
      game="district-noir"
      Rules={DistrictNoirRules}
      optionsSpec={DistrictNoirOptionsSpec}
      GameSetup={DistrictNoirSetup}
      material={Material}
      locators={Locators}
      animations={gameAnimations}
      scoring={scoring}
      tutorial={new Tutorial()}
    >
      <App />
    </GameProvider>
  </StrictMode>
)

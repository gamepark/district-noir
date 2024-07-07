import { MaterialGameSetup } from '@gamepark/rules-api'
import { DistrictNoirOptions } from './DistrictNoirOptions'
import { DistrictNoirRules } from './DistrictNoirRules'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor } from './PlayerColor'
import { RuleId } from './rules/RuleId'

/**
 * This class creates a new Game based on the game options
 */
export class DistrictNoirSetup extends MaterialGameSetup<PlayerColor, MaterialType, LocationType, DistrictNoirOptions> {
  Rules = DistrictNoirRules

  setupMaterial(_options: DistrictNoirOptions) {
  }

  start() {
    this.startPlayerTurn(RuleId.PlayerTurn, this.game.players[0])
  }
}
import { DistrictNoirRules } from '@gamepark/district-noir/DistrictNoirRules'
import { ScoringDescription } from '@gamepark/react-game'
import { GameOverHeader } from './headers/GameOverHeader'

export const scoring: ScoringDescription<number, DistrictNoirRules> = {
  getScoringKeys: () => [],
  getScoringHeader: () => '',
  getScoringPlayerData: () => null,
  ResultHeader: GameOverHeader
}

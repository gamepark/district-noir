import { hideItemId, hideItemIdToOthers, MaterialGame, MaterialMove, PositiveSequenceStrategy, SecretMaterialRules, TimeLimit } from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor } from './PlayerColor'
import { PlayerActionRule } from './rules/PlayerActionRule'
import { RuleId } from './rules/RuleId'
import { EndOfRoundRule } from './rules/EndOfRoundRule'


/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class DistrictNoirRules extends SecretMaterialRules<PlayerColor, MaterialType, LocationType>
  implements TimeLimit<MaterialGame<PlayerColor, MaterialType, LocationType>, MaterialMove<PlayerColor, MaterialType, LocationType>, PlayerColor> {
  rules = {
    [RuleId.PlayerTurn]: PlayerActionRule,
    [RuleId.EndOfRound]: EndOfRoundRule
  }

  hidingStrategies = {
    [MaterialType.Card]: {
      [LocationType.Deck]: hideItemId,
      [LocationType.Hand]: hideItemIdToOthers

    }
  }

  locationsStrategies = {
    [MaterialType.Card]: {
      [LocationType.Deck]: new PositiveSequenceStrategy(),
      [LocationType.Hand]:new PositiveSequenceStrategy(),
      [LocationType.PlayArea]: new PositiveSequenceStrategy(),
      [LocationType.PlayerColumns]: new PositiveSequenceStrategy()
    }
  }

  giveTime(): number {
    return 60
  }

  itemsCanMerge() {
    return false
  }
}
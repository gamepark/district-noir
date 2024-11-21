import { isEnumValue } from '@gamepark/rules-api'

export enum PlayerColor {
  Black = 1, White
}

export const playerColors = Object.values(PlayerColor).filter(isEnumValue)

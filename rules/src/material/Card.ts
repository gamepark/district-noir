import { getEnumValues } from '@gamepark/rules-api'

export enum Card {
  Support5 = 5,
  Support6,
  Support7,
  Support8,

  PerLine = 10,

  Alliance2 = 12,
  Alliance3,
  Alliance4,

  Betrayal1 = 21,
  Betrayal2,
  Betrayal3,
  
  TheDocks = 30,
  PoliceDepartment,
  CityHall,
}


export const isSupport = (card: Card) => [Card.Support5,  Card.Support6,Card.Support7,  Card.Support8].includes(card)
export const supports = getEnumValues(Card).filter(isSupport)
export const isCity = (card: Card) => card >= Card.TheDocks
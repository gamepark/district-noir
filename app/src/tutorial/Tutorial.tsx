import { Card, isAlliance, isBetrayal, isCity, isSupport } from '@gamepark/district-noir/material/Card'
import { LocationType } from '@gamepark/district-noir/material/LocationType'
import { MaterialType } from '@gamepark/district-noir/material/MaterialType'
import { PlayerColor } from '@gamepark/district-noir/PlayerColor'
import { CustomMoveType } from '@gamepark/district-noir/rules/CustomMoveType'
import { MaterialTutorial, TutorialStep } from '@gamepark/react-game'
import { isCustomMoveType, isMoveItemType } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import { me, opponent, TutorialSetup } from './TutorialSetup'

const BaseComponents = {
  bold: <strong/>,
  italic: <em/>
}

export class Tutorial extends MaterialTutorial<PlayerColor, MaterialType, LocationType> {
  version = 4
  options = { players: 2 }
  setup = new TutorialSetup()

  players = [{ id: me }, { id: opponent }]

  steps: TutorialStep[] = [{
    popup: {
      text: () => (
        <Trans i18nKey="tuto.welcome" components={BaseComponents}/>
      )
    }
  },
    {
      popup: {
        text: () => (
          <Trans i18nKey="tuto.goal" components={BaseComponents}/>
        )
      }
    },
    {
      popup: {
        text: () => (
          <Trans i18nKey="tuto.actions" components={BaseComponents}/>
        )
      }
    },
    {
      popup: {
        text: () => (
          <Trans i18nKey="tuto.play.1" components={BaseComponents}/>
        ),
        position: {
          y: -25
        }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.Card).id(Card.Alliance2).location(LocationType.Hand).player(me)
        ],
        locations: [
          this.location(LocationType.PlayArea).location
        ],
        margin: {
          top: 20,
          bottom: 5
        }
      }),
      move: {
        filter: (move, game) => isMoveItemType(MaterialType.Card)(move) && game.items[move.itemType]![move.itemIndex].id === Card.Alliance2
      }
    },
    {
      popup: {
        text: () => (
          <Trans i18nKey="tuto.opponent" components={BaseComponents}/>
        )
      }
    },
    {
      move: {
        player: opponent,
        filter: (move, game) => isMoveItemType(MaterialType.Card)(move) && game.items[move.itemType]![move.itemIndex].id === Card.TheDocks
      }
    },
    {
      popup: {
        text: () => (
          <Trans i18nKey="tuto.opponent.played.1" components={BaseComponents}/>
        ),
        position: {
          x: 30
        }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.Card).id(Card.TheDocks)
        ],
        margin: {
          top: 5,
          bottom: 5,
          right: 20
        }
      })
    },
    {
      popup: {
        text: () => (
          <Trans i18nKey="tuto.take" components={BaseComponents}/>
        ),
        position: {
          y: -20
        }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.Card).location(LocationType.PlayArea)
        ],
        margin: {
          top: 15,
          bottom: 5
        }
      })
    },
    {
      popup: {
        text: () => (
          <Trans i18nKey="tuto.play.2" components={BaseComponents}/>
        ),
        position: {
          y: -27
        }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.Card).id(Card.Support6).location(LocationType.Hand).player(me)
        ],
        locations: [
          this.location(LocationType.PlayArea).location
        ],
        margin: {
          top: 20,
          bottom: 5
        }
      }),
      move: {
        filter: (move, game) => isMoveItemType(MaterialType.Card)(move) && game.items[move.itemType]![move.itemIndex].id === Card.Support6
      }
    },
    {
      move: {
        player: opponent,
        filter: (move, game) => isMoveItemType(MaterialType.Card)(move) && game.items[move.itemType]![move.itemIndex].id === Card.Support8
      }
    },
    {
      popup: {
        text: () => (
          <Trans i18nKey="tuto.opponent.played.2" components={BaseComponents}/>
        ),
        position: {
          y: -20
        }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.Card).location(LocationType.PlayArea).location((l) => l.x! > 0)
        ],
        margin: {
          top: 12,
          left: 12,
          right: 5,
          bottom: 2
        }
      }),
      move: {
        filter: (move) => isCustomMoveType(CustomMoveType.Take)(move)
      }
    },
    {
      popup: {
        text: () => (
          <Trans i18nKey="tuto.supporter" components={BaseComponents}/>
        ),
        position: {
          y: -20
        }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.Card).location(LocationType.PlayerColumns).id((id: Card) => isSupport(id))
        ],
        margin: {
          top: 12,
          left: 7,
          right: 7,
          bottom: 2
        }
      }),
    },
    {
      popup: {
        text: () => (
          <Trans i18nKey="tuto.alliance" components={BaseComponents}/>
        ),
        position: {
          y: -20
        }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.Card).location(LocationType.PlayerColumns).id((id: Card) => isAlliance(id))
        ],
        margin: {
          top: 12,
          left: 7,
          right: 7,
          bottom: 2
        }
      }),
    },
    {
      popup: {
        text: () => (
          <Trans i18nKey="tuto.betrayal" components={BaseComponents}/>
        ),
        position: {
          y: -20
        }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.Card).location(LocationType.PlayerColumns).id((id: Card) => isBetrayal(id))
        ],
        margin: {
          top: 12,
          left: 7,
          right: 7,
          bottom: 2
        }
      }),
    },
    {
      popup: {
        text: () => (
          <Trans i18nKey="tuto.cities" components={BaseComponents}/>
        ),
        size: { width: 100 },
        position: {
          y: -20
        }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.Card).location(LocationType.PlayerColumns).id((id: Card) => isCity(id))
        ],
        margin: {
          top: 12,
          left: 7,
          right: 7,
          bottom: 2
        }
      }),
    },
    {
      popup: {
        text: () => (
          <Trans i18nKey="tuto.round" components={BaseComponents}/>
        )
      }
    },
    {
      popup: {
        text: () => (
          <Trans i18nKey="tuto.end" components={BaseComponents}/>
        )
      }
    }

  ]
}
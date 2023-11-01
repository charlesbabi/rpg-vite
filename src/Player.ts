import { GameObject, type GameObjectConfig } from './GameObject'

export class Player extends GameObject {
  constructor(gameObjectConfig: GameObjectConfig) {
    super(gameObjectConfig)
  }
}

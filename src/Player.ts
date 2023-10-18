import { GameObject, GameObjectConfig } from "./GameObject";


export class Player extends GameObject {
  constructor(gameObjectConfig: GameObjectConfig) {
    super(gameObjectConfig);
  }
}
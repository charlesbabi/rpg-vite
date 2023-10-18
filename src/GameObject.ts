import { Overworld } from "./Overworld";
import { Sprite } from "./Sprite";
import { Actions, DEFAULT_DIRECTION } from "./utils/Constants";

export interface PositionConfig {
  x?: number;
  y?: number;
}

export class Position {
  x: number;
  y: number;
  constructor({ x, y }: PositionConfig) {
    this.x = x || 0;
    this.y = y || 0;
  }
}

export interface GameObjectConfig {
  overworld: Overworld
  x?: number,
  y?: number,
  direction?: string
  src?: string
}

export class GameObject {
  position: Position
  width: number;
  height: number;
  direction: string;
  overworld: Overworld;
  sprite: Sprite;
  speed: number;
  directionUpdate: any;

  constructor(config: GameObjectConfig) {
    this.position = new Position({ x: config.x ?? 0, y: config.y ?? 0 });
    this.width = 24;
    this.height = 32;
    this.speed = 1;
    this.direction = config.direction || DEFAULT_DIRECTION;
    this.overworld = config.overworld;
    this.sprite = new Sprite({
      src: config.src ?? "/assets/sprites/characters/characters.png",
      gameObject: this,
      size: {
        width: this.width,
        height: this.height
      }
    });
    this.directionUpdate = {
      up: ["y", -this.speed],
      down: ["y", this.speed],
      left: ["x", -this.speed],
      right: ["x", this.speed],
    }
  }

  updatePosition() {
    this.overworld.controller.heldDirections.forEach((dir) => {
      if (dir === Actions.up) {
        this.position.y -= this.speed;
      }
      if (dir === Actions.down) {
        this.position.y += this.speed;
      }
      if (dir === Actions.left) {
        this.position.x -= this.speed;
      }
      if (dir === Actions.right) {
        this.position.x += this.speed;
      }
    })
  }

  draw() {
    this.sprite.draw(this.overworld.ctx);
  }

  update() {
    this.updatePosition()
  }
}
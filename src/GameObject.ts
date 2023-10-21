import { Overworld } from "./Overworld";
import { AnimationsList, Sprite } from "./Sprite";
import { Actions, Animations, DEFAULT_DIRECTION } from "./utils/Constants";

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
  animations: AnimationsList;
}

export class GameObject {
  position: Position
  width: number;
  height: number;
  direction: string;
  overworld: Overworld;
  sprite: Sprite;
  speed: number;

  constructor(config: GameObjectConfig) {
    this.position = new Position({ x: config.x ?? 0, y: config.y ?? 0 });
    this.width = 24;
    this.height = 32;
    this.speed = 1;
    this.direction = config.direction || DEFAULT_DIRECTION;
    this.overworld = config.overworld;

    this.sprite = new Sprite({
      src: config.src ?? "",
      gameObject: this,
      size: {
        width: this.width,
        height: this.height
      },
      animations: config.animations ?? {}
    });
  }

  updatePosition() {
    this.overworld.controller.heldDirections.forEach((dir) => {
      if (dir === Actions.up) {
        this.position.y -= this.speed;
        this.sprite.changeAnimation(Animations.walkUp);
      }
      if (dir === Actions.down) {
        this.position.y += this.speed;
        this.sprite.changeAnimation(Animations.walkDown);
      }
      if (dir === Actions.left) {
        this.position.x -= this.speed;
        this.sprite.changeAnimation(Animations.walkLeft);
      }
      if (dir === Actions.right) {
        this.position.x += this.speed;
        this.sprite.changeAnimation(Animations.walkRight);
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
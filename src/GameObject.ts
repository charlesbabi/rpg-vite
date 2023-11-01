import { type Overworld } from './Overworld'
import { type AnimationsList, Sprite } from './Sprite'
import { Actions, Directions } from './utils/Constants'

export interface PositionConfig {
  x?: number
  y?: number
}

export class Position {
  x: number
  y: number
  constructor({ x, y }: PositionConfig) {
    this.x = x ?? 0
    this.y = y ?? 0
  }
}

export interface GameObjectConfig {
  overworld: Overworld
  x?: number
  y?: number
  direction?: string
  src?: string
  animations: AnimationsList
}

export class GameObject {
  position: Position
  width: number
  height: number
  direction: string
  overworld: Overworld
  sprite: Sprite
  speed: number
  isWalking: boolean

  constructor(config: GameObjectConfig) {
    this.position = new Position({ x: config.x ?? 0, y: config.y ?? 0 })
    this.width = 24
    this.height = 32
    this.speed = 1
    this.direction = config.direction ?? Directions.down
    this.overworld = config.overworld
    this.isWalking = false

    this.sprite = new Sprite({
      src: config.src ?? '',
      gameObject: this,
      size: {
        width: this.width,
        height: this.height
      },
      animations: config.animations ?? {}
    })
  }

  updatePosition(): void {
    this.isWalking = false
    this.overworld.controller.heldDirections.forEach((dir) => {
      if (dir === Actions.up) {
        this.position.y -= this.speed
        this.direction = Directions.up
      }
      if (dir === Actions.down) {
        this.position.y += this.speed
        this.direction = Directions.down
      }
      if (dir === Actions.left) {
        this.position.x -= this.speed
        this.direction = Directions.left
      }
      if (dir === Actions.right) {
        this.position.x += this.speed
        this.direction = Directions.right
      }
      this.isWalking = true
    })
    this.sprite.updateMovement()
  }

  draw(): void {
    this.sprite.draw(this.overworld.ctx)
  }

  update(): void {
    this.updatePosition()
  }
}

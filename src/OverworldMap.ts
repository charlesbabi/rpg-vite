import { type GameObject } from './GameObject'

export interface OverworldMapConfig {
  gameObjects: GameObject[]
  lowerSrc: string
  upperSrc: string
}

const MAP_SPRITE_SIZE = {
  width: 32,
  height: 32
}

export class OverworldMap {
  gameObjects: GameObject[]
  lowerImage: HTMLImageElement
  upperImage: HTMLImageElement
  matrix_map: number[][]
  scale: number

  constructor(config: OverworldMapConfig) {
    this.gameObjects = config.gameObjects
    this.lowerImage = new Image()
    this.lowerImage.src = config.lowerSrc
    this.upperImage = new Image()
    this.upperImage.src = config.upperSrc
    this.scale = 2
    this.matrix_map = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1],
      [1, 1, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]
  }

  drawLower(ctx: CanvasRenderingContext2D): void {
    for (let row = 0; row < this.matrix_map.length; row++) {
      for (let column = 0; column < this.matrix_map[row].length; column++) {
        ctx.drawImage(this.lowerImage,
          this.matrix_map[row][column] * MAP_SPRITE_SIZE.width, // left cut
          this.matrix_map[row][column] * MAP_SPRITE_SIZE.height, // top cut
          MAP_SPRITE_SIZE.width, // w cut
          MAP_SPRITE_SIZE.height, // h cut
          column * MAP_SPRITE_SIZE.width * this.scale, // x position
          row * MAP_SPRITE_SIZE.height * this.scale, // y position
          MAP_SPRITE_SIZE.width * this.scale, // w to resize
          MAP_SPRITE_SIZE.height * this.scale // h to resize
        )
      }
    }
  }

  drawUpper(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(this.upperImage, 0, 0)
  }
}

export const OverworldMaps: Record<string, OverworldMapConfig> = {
  DemoRoom: {
    lowerSrc: '/assets/tiles/tileset_grass.png',
    upperSrc: '',
    gameObjects: []
  }
}

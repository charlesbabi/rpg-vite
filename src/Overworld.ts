import { Controllers } from './Controllers'
import { type GameObject } from './GameObject'
import { OverworldMap, OverworldMaps } from './OverworldMap'
import { Player } from './Player'
import { type AnimationsList } from './Sprite'
import { Animations } from './utils/Constants'

export interface OverworldConfig {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  objectSelected?: GameObject
}

export class Overworld {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  objectSelected?: GameObject
  objects: GameObject[]
  map: OverworldMap
  controller: Controllers
  start: number
  previousTimeStamp: number
  fps = 60
  second = 1000
  timePerFrame = this.second / this.fps

  constructor(config: OverworldConfig) {
    this.canvas = config.canvas
    this.ctx = config.ctx
    this.objectSelected = config.objectSelected
    this.objects = []
    this.map = new OverworldMap(OverworldMaps.DemoRoom)
    const animations: AnimationsList = {}
    animations[Animations.iddleDown] = [[1, 2]]
    animations[Animations.iddleUp] = [[1, 0]]
    animations[Animations.iddleLeft] = [[1, 3]]
    animations[Animations.iddleRight] = [[1, 1]]
    animations[Animations.walkDown] = [[0, 2], [1, 2], [2, 2], [1, 2]]
    animations[Animations.walkUp] = [[0, 0], [1, 0], [2, 0]]
    animations[Animations.walkLeft] = [[0, 3], [1, 3], [2, 3], [1, 3]]
    animations[Animations.walkRight] = [[0, 1], [1, 1], [2, 1], [1, 1]]

    this.objectSelected = new Player({
      overworld: this,
      src: '/assets/sprites/characters/characters.png',
      animations
    })

    this.controller = new Controllers({ overworld: this })
    this.start = 0
    this.previousTimeStamp = 0
  }

  update(): void {
    this.objectSelected?.update()
    this.objects.forEach(o => {
      o.update()
    })
  }

  draw(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.map.drawLower(this.ctx)
    this.objectSelected?.draw()
    this.objects.map(o => {
      o.draw()
    })
    this.map.drawUpper(this.ctx)
  }

  initGame(): void {
    this.controller.init()
    this.gameLoop(this.previousTimeStamp)
  }

  gameLoop(timeStamp: DOMHighResTimeStamp) {
    const elapsed = timeStamp - this.start

    if (elapsed > this.timePerFrame) {
      this.update()
      this.draw()
      this.start = timeStamp
    }
    window.requestAnimationFrame((time) => { this.gameLoop(time) })
  }
}

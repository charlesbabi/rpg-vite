import { type Overworld } from './Overworld'
import { Actions } from './utils/Constants'

export interface ControllerConfig {
  overworld: Overworld
}

export class Controllers {
  heldDirections: string[] = []
  map: Record<string, string>
  config: ControllerConfig
  constructor(config: ControllerConfig) {
    this.config = config
    this.map = {
      ArrowUp: Actions.up,
      KeyW: Actions.up,
      ArrowDown: Actions.down,
      KeyS: Actions.down,
      ArrowLeft: Actions.left,
      KeyA: Actions.left,
      ArrowRight: Actions.right,
      KeyD: Actions.right
    }
  }

  get direction(): string[] {
    return this.heldDirections
  }

  init(): void {
    window.addEventListener('keydown', event => {
      const dir = this.map[event.code]
      if (dir && !this.heldDirections.includes(dir)) {
        this.heldDirections.unshift(dir)
      }
    })

    window.addEventListener('keyup', event => {
      const dir = this.map[event.code]
      const index = this.heldDirections.indexOf(dir)
      if (index > -1) {
        this.heldDirections.splice(index, 1)
      }
    })
  }
}

import { Controllers } from "./Controllers";
import { GameObject } from "./GameObject";
import { OverworldMap, OverworldMaps } from "./OverworldMap";
import { Player } from "./Player";

export interface OverworldConfig {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  objectSelected?: GameObject;
}

export class Overworld {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D
  objectSelected?: GameObject;
  objects: GameObject[];
  map: OverworldMap;
  controller: Controllers;

  constructor(config: OverworldConfig) {
    this.canvas = config.canvas
    this.ctx = config.ctx
    this.objectSelected = config.objectSelected;
    this.objects = [];
    this.map = new OverworldMap(OverworldMaps.DemoRoom)
    this.objectSelected = new Player({ overworld: this });
    this.controller = new Controllers({ overworld: this });
  }

  update(): void {
    this.objectSelected?.update();
    this.objects.map(o => {
      o.update()
    })
  }

  draw(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.map.drawLower(this.ctx);
    this.objectSelected?.draw();
    this.objects.map(o => {
      o.draw()
    })
    this.map.drawUpper(this.ctx);
  }

  initGame(): void {
    this.controller.init();
    this.gameLoop()
  }

  gameLoop() {
    this.update();
    this.draw();
    window.requestAnimationFrame(() => this.gameLoop())
  }
}
import { GameObject } from "./GameObject";
import { Animations, SPRITES_SIZE } from "./utils/Constants";

export interface Size {
  width: number;
  height: number;
}

export interface SpriteConfig {
  src: string;
  gameObject: GameObject;
  animation?: Animation[];
  currentAnimation?: string;
  size?: Size;
}

export class Animation {
  constructor() {
  }
}

export class Sprite {
  image: HTMLImageElement;
  gameObject: GameObject;
  animation: Animation;
  currentAnimation: string;
  isLoaded = false;
  size: Size;
  scale: number;

  constructor(config: SpriteConfig) {
    //set up image
    this.image = new Image();
    this.image.src = config.src
    this.image.onload = () => {
      this.isLoaded = true;
    }
    this.size = config.size || {
      width: SPRITES_SIZE.width,
      height: SPRITES_SIZE.height
    }
    this.scale = 1;

    //reference to game object
    this.gameObject = config.gameObject;

    //animations
    this.animation = config.animation ?? new Animation
    this.currentAnimation = config.currentAnimation ?? Animations.iddleDown;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const x = this.gameObject.position.x * this.size.width / 2;
    const y = this.gameObject.position.y * this.size.height / 2;

    ctx.drawImage(this.image,
      2 * this.size.width, // left cut
      2 * this.size.height, // top cut
      this.size.width, // w cut
      this.size.height, // h cut
      x, // x position
      y, // y position
      this.size.width * this.scale, // w to resize
      this.size.height * this.scale // h to resize
    )
  }
}
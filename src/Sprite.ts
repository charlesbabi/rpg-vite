import { GameObject } from "./GameObject";
import { Animations, SPRITES_SIZE } from "./utils/Constants";

export interface Size {
  width: number;
  height: number;
}

export interface SpriteConfig {
  src: string;
  gameObject: GameObject;
  animations?: Record<string, [number, number][]>;
  currentAnimation?: string;
  size?: Size;
}

export interface AnimationConfig {
  x: number;
  y: number;
  xRange: number[];
  yRange: number[];
}

export interface AnimationsList extends Record<string, [number, number][]> {

}


export class Sprite {
  image: HTMLImageElement;
  gameObject: GameObject;
  animations: AnimationsList;
  currentAnimation: string;
  isLoaded = false;
  size: Size;
  scale: number;

  // Animation
  animationFrame = 0;
  animationFrameLimit = 10;
  currentAnimationFrame = 0;

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
    this.scale = 2;
    this.animations = config.animations ?? {};

    //reference to game object
    this.gameObject = config.gameObject;

    this.currentAnimation = config.currentAnimation ?? Animations.iddleDown;
  }

  get frame(): [number, number] {
    return this.animations[this.currentAnimation][this.currentAnimationFrame];
  }

  changeAnimation(animation: string) {
    if (this.currentAnimation !== animation) {
      this.currentAnimation = animation;
      this.currentAnimationFrame = 0;
    }
  }

  updateAnimationFrame() {
    this.animationFrame++;
    if (this.animationFrame > this.animationFrameLimit) {
      this.currentAnimationFrame++;
      this.animationFrame = 0;
    }
    if (this.frame === undefined) {
      this.currentAnimationFrame = 0;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    const x = this.gameObject.position.x;
    const y = this.gameObject.position.y;

    const [frameX, frameY] = this.frame;

    ctx.drawImage(this.image,
      frameX * this.size.width, // left cut
      frameY * this.size.height, // top cut
      this.size.width, // w cut
      this.size.height, // h cut
      x, // x position
      y, // y position
      this.size.width * this.scale, // w to resize
      this.size.height * this.scale // h to resize
    )
    this.updateAnimationFrame();
  }
}
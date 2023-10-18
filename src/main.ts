import { Controllers } from './Controllers';
import { Overworld } from './Overworld';
import { Player } from './Player';
import './style.css'
const BOARD_WIDHT = 800;
const BOARD_HEIGHT = 600;

(() => {
  const canvas = <HTMLCanvasElement>document.querySelector('#game');
  if (!canvas) {
    throw new Error("Context not loaded");
  }
  canvas.width = BOARD_WIDHT;
  canvas.height = BOARD_HEIGHT;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error("Context not loaded");
  }

  // Create overworld
  const overworld = new Overworld({ canvas, ctx });

  const hero = new Player({ overworld })
  overworld.objectSelected = hero;
  overworld.initGame();
})();
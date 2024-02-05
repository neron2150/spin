import { Container, Texture } from 'pixi.js';
import { randomSymbolTexture } from './utils';
import { BOTTOM_SYMBOL_INDEX, OFFSET, SYMBOL_SIZE, SPEED } from './constants';
import gasp from 'gsap';
import { Game } from '.';
import { Symbol } from './Symbol';

export class Reel {
  private container: Container;
  private symbols: Symbol[];
  private bottomBorder = 0;
  private animatedY = 0;
  private _isSpinning = false;

  constructor(textures: Texture[]) {
    this.container = new Container();
    this.symbols = Array.from(
      { length: 5 },
      () => new Symbol(randomSymbolTexture(textures))
    );

    this.createSymbols();
  }
  createSymbols() {
    this.symbols.forEach((symbol, index) => {
      symbol.y = index * (SYMBOL_SIZE + OFFSET);
      symbol.originalY = symbol.y;
      this.container.addChild(symbol);
      if (index === BOTTOM_SYMBOL_INDEX) {
        this.bottomBorder = symbol.y;
      }
    });
  }

  attachTo(parent: Container) {
    parent.addChild(this.container);
  }

  spin(amount: number) {
    this._isSpinning = true;
    gasp.to(this, {
      animatedY: (SYMBOL_SIZE + OFFSET) * amount,
      duration: amount / SPEED,
      onComplete: this.onSpinComplete.bind(this),
      onUpdate: this.animationTick.bind(this),
    });
  }

  private onSpinComplete() {
    this.animatedY = 0;
    this.symbols.forEach((symbol) => {
      symbol.originalY = symbol.y;
    });
    this._isSpinning = false;
  }

  private animationTick() {
    this.symbols.forEach((symbol) => {
      const newY = symbol.originalY + this.animatedY;
      symbol.setBlur(newY - symbol.y);
      symbol.y = newY;
      if (symbol.y > this.bottomBorder + SYMBOL_SIZE + OFFSET) {
        symbol.updateTexture(randomSymbolTexture(Game.textures));
        symbol.y = symbol.originalY =
          (-SYMBOL_SIZE - OFFSET) *
          Math.trunc(this.animatedY / (SYMBOL_SIZE + OFFSET));
      }
    });
  }

  get x() {
    return this.container.x;
  }

  get isSpinning() {
    return this._isSpinning;
  }

  set x(value: number) {
    this.container.x = value;
  }
}

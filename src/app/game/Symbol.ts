import { BlurFilter, Sprite, Texture } from 'pixi.js';
import { SYMBOL_SIZE } from './constants';

export class Symbol extends Sprite {
  private _originalY = 0;

  constructor(texture: Texture) {
    super(texture);
    const sprite = new Sprite(texture);
    this.anchor.set(0.5);
    this.scale.set(1);
    this.scale.set(
      Math.min(SYMBOL_SIZE / sprite.width, SYMBOL_SIZE / sprite.height)
    );
    const blurFilter = new BlurFilter();
    blurFilter.blur = 0;
    this.filters = [blurFilter];
  }

  updateTexture(texture: Texture) {
    this.texture = texture;
    this.scale.set(1);
    this.scale.set(
      Math.min(SYMBOL_SIZE / this.width, SYMBOL_SIZE / this.height)
    );
  }

  set originalY(y: number) {
    this._originalY = y;
  }

  get originalY() {
    return this._originalY;
  }

  setBlur (amount: number) {
    (this.filters![0] as BlurFilter).blurY = amount;
  }
}

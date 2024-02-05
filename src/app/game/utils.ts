import { Texture } from 'pixi.js';

export const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const randomSymbolTexture = (textures: Texture[]) =>
  textures[randomInt(0, textures.length - 1)];

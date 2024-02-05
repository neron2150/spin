import { Application, Assets, Container, Graphics, Texture } from 'pixi.js';
import { OFFSET, SYMBOL_SIZE, TEXTURES_URLS } from './constants';
import { Reel } from './Reel';
import { randomInt } from './utils';
export class Game {
  private static _app: Application = new Application({
    resizeTo: window,
  });
  private static _textures: Texture[] = [];
  private static reels: Reel[] = [];
  private static reelsContainer: Container = new Container();

  static init = async () => {
    Game.loadAssets().then(() => {
      Game.addReels();
      Game.addMask();
    });

    Game.app.stage.addChild(Game.reelsContainer);
  };

  private static addMask = () => {
    const mask = new Graphics();
    mask.beginFill('fff');
    mask.drawRect(
      -SYMBOL_SIZE / 2,
      Game.reelsContainer.y + (SYMBOL_SIZE + OFFSET) * 2 + OFFSET / 2,
      SYMBOL_SIZE * 5 + OFFSET * 4,
      SYMBOL_SIZE * 3 + OFFSET * 3
    );
    Game.reelsContainer.mask = mask;
    mask.endFill();
    Game.reelsContainer.addChild(mask);
  };

  private static addReels() {
    Game.reels = Array.from({ length: 5 }, () => new Reel(Game.textures));
    Game.reels.forEach((reel, index) => {
      reel.attachTo(Game.reelsContainer);
      reel.x = index * (SYMBOL_SIZE + OFFSET);
    });
    Game.reelsContainer.x += Game.reelsContainer.width / 2 + SYMBOL_SIZE / 2;
    Game.reelsContainer.y +=
      Game.reelsContainer.height / 2 - (SYMBOL_SIZE + OFFSET) * 3;
  }

  private static loadAssets = async () => {
    Game._textures = await Assets.load(TEXTURES_URLS).then(Game.onAssetsLoaded);
  };

  static onAssetsLoaded = () => {
    const slotsTextures = TEXTURES_URLS.map((url) => Texture.from(url));
    return slotsTextures;
  };

  static spin = () => {
    if (Game.reels.some((reel) => reel.isSpinning)) {
      return;
    }
    Game.reels.forEach((reel) => {
      reel.spin(randomInt(3, 10));
    });
  };

  static get app() {
    return Game._app;
  }

  static get textures() {
    return Game._textures;
  }
}

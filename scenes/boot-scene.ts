import { GameObjects } from 'phaser';
import { IGameType } from '../types/game';
import { clickable } from '../shared';

type GTextLink = {
  GObj: GameObjects.BitmapText;
  gameType: IGameType;
};

export class BootScene extends Phaser.Scene {
  private playersTotal: 2 | 3 = 2;

  constructor() {
    super({
      key: 'BootScene'
    });
  }

  preload(): void {
    this.load.pack('preload', './assets/pack.json', 'preload');
  }

  create(): void {
    const { width, height } = this.sys.game.canvas;

    const scenes = [
      {
        GObj: this.add.bitmapText(
          width / 2,
          height * 0.33,
          'pcsenior',
          'Texas',
          36
        ),
        gameType: 'Texas'
      },
      {
        GObj: this.add.bitmapText(
          width / 2,
          height * 0.5,
          'pcsenior',
          'Five Draw',
          36
        ),
        gameType: 'Five'
      },
      {
        GObj: this.add.bitmapText(80, height - 50, 'pcsenior', 'Test', 24),
        gameType: null
      }
    ];

    scenes.forEach(({ GObj, gameType }) =>
      clickable(GObj, {
        onDown: () =>
          gameType
            ? this.scene.start('TableScene', { gameType, totalPlayers: 2 })
            : this.scene.start('TestScene')
      })
    );
  }
}

import 'phaser';
import { BootScene } from './scenes/boot-scene';
import { TableScene } from './scenes/table-scene';
import { TestScene } from './scenes/test-scene';
import { GAME_BACKGROUND, GAME_HEIGHT, GAME_WIDTH } from './config';

const config: Phaser.Types.Core.GameConfig = {
  title: 'Cards Demo',
  version: '1.0',
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  zoom: 1,
  type: Phaser.AUTO,
  parent: 'game',
  scene: [BootScene, TableScene, TestScene],
  backgroundColor: GAME_BACKGROUND,
  render: { pixelArt: true, antialias: false }
};

export class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

window.addEventListener('load', () => {
  const game = new Game(config);
});

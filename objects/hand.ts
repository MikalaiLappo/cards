import { TableScene } from '../scenes/table-scene';
import { Card } from './card';

export class Hand extends Phaser.GameObjects.Rectangle {
  public cards: Card[];

  constructor({
    scene,
    x,
    y,
    cards
  }: {
    x: number;
    y: number;
    scene: TableScene;
    cards: Card[];
    isTable: boolean;
  }) {
    super(scene, x, y, 0, 0, 0xdc143c);
    this.cards = cards;
    this.scene.add.existing(this);
    this.setOrigin(0.5, 0.5);
  }

  *[Symbol.iterator]() {
    for (const card of this.cards) {
      yield card;
    }
  }
}

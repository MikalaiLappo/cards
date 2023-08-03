import { CARD_SUITS, CARD_VALUES } from '../constants';
import { ICard, ICardSuit, ICardValue } from '../types/card';
import { Tuple } from '../types/internal';

export class Deck extends Phaser.GameObjects.Rectangle {
  private cardPool: ICard[];
  private drawn: number = 0;

  constructor({ scene, x, y }: { x: number; y: number; scene: Phaser.Scene }) {
    super(scene, x, y);
    this.scene.add.existing(this);
    this.initPool();
  }

  *[Symbol.iterator]() {
    for (const card of this.cardPool) yield card;
  }

  initPool() {
    this.cardPool = CARD_VALUES.flatMap((value: ICardValue) =>
      CARD_SUITS.map((suit: ICardSuit) => ({
        value,
        suit
      }))
    ).sort(() => 0.5 - Math.random());
  }

  draw(): ICard {
    const card = this.cardPool[this.drawn];
    this.drawn++;
    return card;
  }

  drawMany<T extends number>(len: T): Tuple<ICard, T> {
    const cards = this.cardPool.slice(this.drawn, this.drawn + len);
    this.drawn += len;
    return cards as Tuple<ICard, T>;
  }

  get size() {
    return this.cardPool.length;
  }
}

import { CARDS_SPRITESHEET } from '../config';
import { Card } from '../objects/card';
import { ICardSuit, ICardValue } from '../types/card';

export class CardFactory {
  private currentScene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.currentScene = scene;
  }

  public create({ x, y, suit, value }: IEnemyFactoryCreate): Card {
    return new Card({
      scene: this.currentScene,
      x,
      y,
      key: CARDS_SPRITESHEET,
      frame: suitRow[suit] * columns + valueColumn[value],
      suit,
      value
    });
  }
}

export interface IEnemyFactoryCreate {
  suit: ICardSuit;
  value: ICardValue;
  x: number;
  y: number;
}

// { [key in ICardSuit]: number }
const suitRow = {
  Clubs: 0,
  Diamonds: 1,
  Spades: 2,
  Hearts: 3
} as const;

// : { [key in ICardValue]: number }
const valueColumn = {
  Ace: 0,
  '2': 1,
  '3': 2,
  '4': 3,
  '5': 4,
  '6': 5,
  '7': 6,
  '8': 7,
  '9': 8,
  '10': 9,
  Jack: 10,
  Queen: 11,
  King: 12
} as const;
const columns = 15;

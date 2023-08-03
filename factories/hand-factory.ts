import { CARD_WIDTH } from '../config';
import { Card } from '../objects/card';
import { Hand } from '../objects/hand';
import { TableScene } from '../scenes/table-scene';
import { ICard } from '../types/card';
import { Flop, IGameType, River, Turn } from '../types/game';
import { Tuple } from '../types/internal';
import { CardFactory } from './card-factory';

export class HandFactory {
  private currentScene: TableScene;
  private cardFactory: CardFactory;

  constructor(scene: TableScene) {
    this.currentScene = scene;
    this.cardFactory = new CardFactory(this.currentScene);
  }

  public create({
    x: centerX,
    y: centerY,
    cardsData,
    isTable = false
  }: IHandFactoryCreate): Hand {
    const GObjCards: Card[] = [...cardsData.entries()].map(([i, card]) => {
      // ad-hoc X positioning since there is no concrete visualization plan
      const half_i = ~~(cardsData.length / 2);
      const margin =
        i <= half_i ? -((half_i - i) * CARD_WIDTH) : (i - half_i) * CARD_WIDTH;
      const x =
        cardsData.length % 2 && i == ~~(cardsData.length / 2)
          ? centerX
          : cardsData.length % 2
          ? centerX + margin
          : centerX + (CARD_WIDTH / 2 + margin);

      return this.cardFactory.create({
        x,
        y: centerY,
        suit: card.suit,
        value: card.value
      });
    });

    return new Hand({
      scene: this.currentScene,
      x: centerX,
      y: centerY,
      cards: GObjCards,
      isTable
    });
  }
}

type IHandFactoryCreateBase<T extends IGameType | 'table'> = {
  x: number;
  y: number;
  type: T;
  isTable?: boolean;
};
type ICreateTexas = IHandFactoryCreateBase<'Texas'> & {
  cardsData: Tuple<ICard, 2>;
};
type ICreateFive = IHandFactoryCreateBase<'Five'> & {
  cardsData: Tuple<ICard, 5>;
};

type ICreateTable = IHandFactoryCreateBase<'table'> & {
  cardsData: Flop | Turn | River;
};

type IHandFactoryCreate = ICreateTable | ICreateFive | ICreateTexas;

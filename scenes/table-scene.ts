import { HandFactory } from '../factories/hand-factory';
import { Hand } from '../objects/hand';
import { Deck } from '../objects/deck';
import { CARD_HEIGHT, CARD_WIDTH } from '../config';
import { IGameType } from '../types/game';
import { Tuple } from '../types/internal';
import { CARD_SUITS, POKER_HAND_SIZE } from '../constants';
import { makeBackButton, makeResetButton } from '../factories/button-factory';
import { ICardValue } from '../types/card';
import { Card } from '../objects/card';

export class TableScene extends Phaser.Scene {
  private handFactory: HandFactory;
  private deck: Deck;
  private totalPlayers: 2 | 3;
  private gameType: IGameType;
  private tableHand: Hand;
  private playersHands: Hand[];

  constructor() {
    super({
      key: 'TableScene'
    });
  }

  init({
    gameType,
    totalPlayers
  }: {
    gameType: IGameType;
    totalPlayers: 2; // | 3;
  }): void {
    this.handFactory = new HandFactory(this);
    this.gameType = gameType;
    this.totalPlayers = totalPlayers;
  }

  create(): void {
    makeBackButton({ scene: this });
    makeResetButton({ scene: this }, () => {
      this.scene.start('TableScene', {
        gameType: this.gameType,
        totalPlayers: this.totalPlayers
      });
    });

    this.initGame();
  }

  initGame(): void {
    this.deck = new Deck({ x: 0, y: 0, scene: this });
    this.putTable();
    this.putPlayers();
    this.putHandsEvals();
  }

  putTable(): void {
    const { width, height } = this.sys.game.canvas;
    const [centerX, centerY] = [width / 2, height / 2];

    this.tableHand = this.handFactory.create({
      x: centerX,
      y: centerY,
      type: 'table',
      cardsData: this.deck.drawMany(5),
      isTable: true
    });
  }

  putPlayers(): void {
    const playerDraw = () => this.deck.drawMany(POKER_HAND_SIZE[this.gameType]);
    const playersCoords = this.positionPlayers(this.totalPlayers);

    this.playersHands = playersCoords.map((xy) =>
      this.handFactory.create({
        ...xy,
        cardsData: playerDraw() as any, // TODO: maybe infer array length properly, but the thing is type-safe more than enough
        type: this.gameType
      })
    );
  }

  // purple — 0x9370db
  // lawn green — 0x7cfc00
  // both got  0xe9967a
  putHandsEvals(): void {
    for (const { x, y, cards } of this.playersHands) {
      const ev = evalHand([...cards, ...this.tableHand.cards]);
      if (!ev) return;
      const { value, combo, gObjs } = ev;

      gObjs.forEach((go) => {
        go.setStreakColor(0x9370db);
      });
    }
  }

  positionPlayers(numOfPlayers: 2 | 3): Tuple<{ x: number; y: number }, 2 | 3> {
    const { width, height } = this.sys.game.canvas;
    const HAND_MARGIN = 16;

    const [bottomPlayerX, bottomPlayerY] = [
      width / 2,
      height - CARD_HEIGHT / 2 - HAND_MARGIN
    ];

    if (numOfPlayers == 3) {
      return [
        {
          // Left player
          x: CARD_WIDTH + HAND_MARGIN,
          y: CARD_HEIGHT / 2 + HAND_MARGIN * 2
        },
        {
          // Right player
          x: width - CARD_WIDTH - HAND_MARGIN,
          y: CARD_HEIGHT / 2 + HAND_MARGIN * 2
        },
        { x: bottomPlayerX, y: bottomPlayerY }
      ];
    }

    return [
      {
        // Top player
        x: bottomPlayerX,
        y: HAND_MARGIN + CARD_HEIGHT / 2
      },
      { x: bottomPlayerX, y: bottomPlayerY }
    ];
  }
}

const evalHand = (cards: Card[]) => {
  const quantCombos = Object.entries(
    cards.reduce((o, card) => {
      if (o[card.value]) {
        o[card.value].gObjs.push(card);
        o[card.value].count++;
      } else {
        o[card.value] = { count: 1, gObjs: [card] };
      }
      return o;
    }, {} as { [key in ICardValue]?: { count: number; gObjs: Card[] } })
  ).filter(([_, { count }]) => count > 1);

  if (quantCombos.length === 0) return null;
  if (quantCombos.length === 1) {
    const [value, { count, gObjs }] = quantCombos[0];
    return { value, combo: kindCombos[count as 4 | 3 | 2], gObjs };
  }

  const takeCombo = ([combo, resLen]: [number, number]) =>
    quantCombos
      .filter(([_, { count }]) => count === combo)
      .sort(([_, { count: c1 }], [__, { count: c2 }]) => c2 - c1)
      .slice(0, resLen);

  const [pairs, sets, fours] = [
    [2, 2], // we should be interested in (at most) 2 best pairs
    [3, 1], // but if we have multiple sets or fours we don't have much to do with any but the strongest one
    [4, 1] // (as far as i get it)
  ].map(takeCombo);

  console.log(
    'multi combo',
    [fours, sets, pairs].find((c) => c.length > 1)
  );

  // TODO: implement sequential combos, e.g. Flash, Straight
  const [clubs, diamonds, hearts, spades] = CARD_SUITS.map((suit) =>
    cards.filter((card) => card.suit == suit)
  );
};

type KindCombo = 'Pair' | 'Set' | 'Four';
const kindCombos: { [keyi in 4 | 3 | 2]: KindCombo } = {
  4: 'Four',
  3: 'Set',
  2: 'Pair'
};

type KindStack = 'Two Pairs' | 'Full House';

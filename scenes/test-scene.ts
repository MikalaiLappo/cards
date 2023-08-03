import { makeBackButton, makeResetButton } from '../factories/button-factory';
import { CARD_HEIGHT, CARD_WIDTH } from '../config';
import { Deck } from '../objects/deck';
import { CardFactory } from '../factories/card-factory';

export class TestScene extends Phaser.Scene {
  private deck: Deck;
  private cardFactory: CardFactory;

  constructor() {
    super({
      key: 'TestScene'
    });
  }

  init(): void {
    this.cardFactory = new CardFactory(this);
    makeBackButton({ scene: this });
    makeResetButton({ scene: this }, () => this.scene.start('TestScene'));
  }

  create() {
    this.testDeck();
  }

  testDeck(): void {
    const { width, height } = this.sys.game.canvas;
    const CARDS_PER_ROW = ~~(width / CARD_WIDTH);

    this.deck = new Deck({ x: 0, y: 0, scene: this });

    for (const [i, card] of [...this.deck].entries()) {
      this.cardFactory.create({
        x: CARD_WIDTH * (i % CARDS_PER_ROW) + CARD_WIDTH / 2,
        y: CARD_HEIGHT * ~~(i / CARDS_PER_ROW) + CARD_HEIGHT,
        ...card
      });
    }
  }
}

import { TINT_SELECTED, TINT_CLICKABLE } from '../config';
import { ICardSuit, ICardValue } from '../types/card';
import { SpriteObjectParams } from '../types/object';

export class Card extends Phaser.GameObjects.Image {
  private _isSelected: boolean = false;
  public suit: ICardSuit;
  public value: ICardValue;
  public streakColor: number | undefined;

  constructor({
    scene,
    x,
    y,
    key,
    frame,
    suit,
    value
  }: SpriteObjectParams & {
    scene: Phaser.Scene;
    suit: ICardSuit;
    value: ICardValue;
  }) {
    super(scene, x, y, key, frame);

    this.suit = suit;
    this.value = value;

    this.scene.add.existing(this);
    this.initImage();
  }

  private initImage(): void {
    
    // TODO: wrap-up within `clickable`
    this.setOrigin(0.5, 0.5);

    this.setInteractive({ cursor: 'pointer' });
        
    this.on('pointerover', () => {
      if (this.streakColor) return;
      if (!this._isSelected) this.setTint(TINT_CLICKABLE);
    });
    
    this.on('pointerout', () => {
      if (this.streakColor) return;
      if (!this._isSelected) this.clearTint();
    });

    this.on('pointerdown', () => {
      this._isSelected = !this._isSelected;
      this.y = this.y + (this._isSelected ? -1 : 1) * 16;
      if (this.streakColor) return;
      this.setTint(this._isSelected ? TINT_SELECTED : TINT_CLICKABLE);
    });
  }

  public setStreakColor(color: number) {
    this.setTint(color);
    this.streakColor = color;
  }

  toString() {
    return `${this.value} of ${this.suit}`;
  }
}

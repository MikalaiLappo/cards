import { ICardSuit, ICardValue } from './types/card';
import { IGameType } from './types/game';

export const CARD_SUITS: ICardSuit[] = [
  'Clubs',
  'Diamonds',
  'Hearts',
  'Spades'
];
export const CARD_VALUES: ICardValue[] = [
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'Jack',
  'Queen',
  'King',
  'Ace'
];

export const POKER_HAND_SIZE: { [key in IGameType]: number } = {
  Texas: 2,
  Five: 5
};

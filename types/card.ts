export type ICardSuit = 'Spades' | 'Diamonds' | 'Hearts' | 'Clubs';
export type ICardValue =
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | 'Jack'
  | 'Queen'
  | 'King'
  | 'Ace';

export type ICard = {
  suit: ICardSuit;
  value: ICardValue;
};

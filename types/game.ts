import { ICard } from "./card";
import { Tuple } from "./internal";

export type IGameType = 'Texas' | 'Five';

export type Flop = Tuple<ICard, 3>;
export type Turn = Tuple<ICard, 4>;
export type River = Tuple<ICard, 5>;
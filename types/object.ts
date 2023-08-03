export type ObjectParams = {
  scene: Phaser.Scene;
  x: number;
  y: number;
  key: string;
};

export type SpriteObjectParams = ObjectParams & {
  frame: number;
};

import { GAME_WIDTH } from '../config';
import { clickable } from '../shared';

const DEFAULT_TOP_MISC_Y = 24;
const DEFAULT_LEFT_MISC_X = 48;
const DEFAULT_RIGHT_MISC_X = GAME_WIDTH - 48;

export const makeBackButton = ({
  x,
  y,
  scene
}: {
  x?: number;
  y?: number;
  scene: Phaser.Scene;
}) =>
  clickable(
    scene.add.text(x ?? DEFAULT_LEFT_MISC_X, y ?? DEFAULT_TOP_MISC_Y, '←', {
      fontSize: '48px'
    }),
    {
      onDown: () => scene.scene.start('BootScene')
    }
  );

export const makeResetButton = (
  { x, y, scene }: { x?: number; y?: number; scene: Phaser.Scene },
  onDown: () => void
) =>
  clickable(
    scene.add.text(
      x ?? DEFAULT_RIGHT_MISC_X,
      y ?? DEFAULT_TOP_MISC_Y + 12,
      '↻',
      {
        fontSize: '36px'
      }
    ),
    {
      onDown
    }
  );

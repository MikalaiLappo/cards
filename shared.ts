import { TINT_CLICKABLE } from './config';

type CB = () => void;
const fireCb = (cb: CB | undefined) => cb && cb();

/**
 *
 * @param gObj an instance of `Phaser.GameObjects.*`
 * @param listeners custom event listeners
 * @returns mutated GObj reference
 */
export const clickable = (
  gObj:
    | Phaser.GameObjects.Image
    | Phaser.GameObjects.BitmapText
    | Phaser.GameObjects.Text, // TODO: do something with this dumb typing
  { onDown, onOver, onOut }: { onDown?: CB; onOver?: CB; onOut?: CB }
) => {
  gObj.setOrigin(0.5, 0.5);
  gObj.setInteractive({ cursor: 'pointer' });
  gObj.on('pointerover', () => {
    gObj.setTint(TINT_CLICKABLE);
    fireCb(onOver);
  });
  gObj.on('pointerout', () => {
    gObj.clearTint();
    fireCb(onOut);
  });
  gObj.on('pointerdown', () => fireCb(onDown));

  return gObj;
};

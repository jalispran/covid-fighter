import dude from '../../assets/dude.png'
import {config} from '../../index'
import MovePlayer from '../MovePlayer'

export default class PlayerFactory {

  static loadPlayer(ctx) {
      ctx.load.spritesheet('dude', dude, { frameWidth: 32, frameHeight: 48 });
  }

  static createPlayer(ctx, x=config.width/2, y=config.height/2) {
    let player = ctx.physics.add.sprite(x, y, 'dude')
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    let move = new MovePlayer(player)

    //  Our player animations, turning, walking left and walking right.
    ctx.anims.create({
        key: 'left',
        frames: ctx.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    ctx.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    ctx.anims.create({
        key: 'right',
        frames: ctx.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    return { player: player, move: move }
  }
}

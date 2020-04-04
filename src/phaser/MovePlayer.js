import {config} from '../index'

export default class MovePlayer {

  constructor(player) {
    this.player = player
  }

  right() {
    this.player.setVelocityX(160);
    this.player.anims.play('right', true);
  }

  left() {
    this.player.setVelocityX(-160);
    this.player.anims.play('left', true);
  }

  jump() {
    this.player.setVelocityY(-330);
  }

  stay_put() {
    this.player.setVelocityX(0);
    this.player.anims.play('turn');
  }

  default_controls(ctx, cursors) {
    if (cursors.left.isDown) {
      this.left()
    } else if (cursors.right.isDown) {
      this.right()
    } else if (ctx.input.activePointer.isDown) {
        if (ctx.input.activePointer.x > config.width - 200) {
          if(ctx.input.activePointer.y > (config.height/2)) {
            //right bottom corner
            this.right()
          } else if(this.player.body.touching.down) {
            //right top corner
            this.jump()
          }
        } else if (ctx.input.activePointer.x < 200) {
          if(ctx.input.activePointer.y > (config.height/2)) {
            //left bottom corner
            this.left()
          } else if(this.player.body.touching.down) {
            //left top corner
            this.jump()
          }
        }
    } else {
        this.stay_put()
    }

    if (cursors.up.isDown && this.player.body.touching.down){
      this.jump()
    }
  }

}

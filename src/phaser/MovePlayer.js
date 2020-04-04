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

}

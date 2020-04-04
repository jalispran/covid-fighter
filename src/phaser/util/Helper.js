export const collectStarInTutorial = (player, star) => {
    star.disableBody(true, true);

    if (stars.countActive(true) === 1){
      console.log('one star remaining, show tutorial tip')

      var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
      var bomb = bombs.create(x, 16, 'bomb');
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
      bomb.allowGravity = false;

    }
  }

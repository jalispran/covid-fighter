import Phaser from 'phaser'
import star from '../../assets/star.png'
import {config} from '../../index'

export default class StarFactory {

  static loadStar(ctx) {
    ctx.load.image('star', star);
  }

  static createStar(ctx, tot_stars = (config.width) / stepX, stepX = 74) {
    let x = (config.width - (stepX*tot_stars))/2
    let stars = ctx.physics.add.group({
        key: 'star',
        repeat: tot_stars,
        setXY: { x: x, y: 0, stepX: stepX }
    });

    stars.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });

    return stars
  }

}

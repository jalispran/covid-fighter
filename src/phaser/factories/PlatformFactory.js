import {config} from '../../index'

import ground from '../../assets/stage/Tiles/2.png'
import ground1 from '../../assets/stage/Tiles/13.png'
import ground2 from '../../assets/stage/Tiles/15.png'

export default class PlatformFactory {

  static loadMenuScreenPlatform(ctx) {
    ctx.load.image('ground', ground)
  }

  static loadTutorialScenePlatform(ctx) {
    ctx.load.image('ground', ground)
    ctx.load.image('ground1', ground1)
    ctx.load.image('ground2', ground2)
  }

  static createMenuScreenPlatform(ctx) {
    for(let i=0; i<=config.width; i+=64){
        ctx.add.image(i, config.height-32, 'ground').setScale(0.5)
    }
  }

  static createTutorialScenePlatorm(ctx) {
    let platforms = ctx.physics.add.staticGroup();
    for(let i=0; i<=config.width; i+=64){
        platforms.create(i, config.height-32, 'ground').setScale(0.5).refreshBody()
    }

    let sxc1 = 325
    let syc1 = 600
    platforms.create(sxc1, syc1, 'ground1').setScale(0.5).refreshBody()
    platforms.create(sxc1 = (sxc1 + 64), syc1, 'ground2').setScale(0.5).refreshBody()

    return platforms
  }


}

import {config} from '../../index'

import backdrop from '../../assets/stage/BG/BG_large.png'
import fsIcon from '../../assets/controls/transparentLight28.png'
import pause from '../../assets/controls/transparentLight12.png'

export default class AssetFactory {

  static loadAsset(ctx) {
    ctx.load.image('sky', backdrop)
    ctx.load.image('fs', fsIcon)
    ctx.load.image('pause', pause)
  }

  static createBackdrop(ctx) {
      ctx.add.image(config.width/2, config.height/2, 'sky')
  }

  static createFullScreenBtn(ctx) {
    ctx.add.image(config.width - 50, 50, 'fs')
      .setInteractive()
      .on('pointerup', () => {ctx.scale.toggleFullscreen()})
  }

  static createPauseBtn(ctx) {    
    ctx.add.image(config.width - 150, 50, 'pause')
      .setInteractive()
      .on('pointerdown', () => {ctx.scene.pause(); ctx.scene.launch('PauseScene')})
  }
}

import {config} from '../../index'

import backdrop from '../../assets/stage/BG/BG_large.png'
import fsIcon from '../../assets/controls/transparentLight28.png'
import pause from '../../assets/controls/transparentLight12.png'
import fwdArrow from '../../assets/controls/transparentLight19.png'
import btn_start from '../../assets/controls/transparentLight40.png'

export default class AssetFactory {

  static loadAsset(ctx) {
    ctx.load.image('sky', backdrop)
    ctx.load.image('fs', fsIcon)
    ctx.load.image('pause', pause)

    ctx.load.image('fwdArrow', fwdArrow)
    ctx.load.image('btn_start', btn_start)
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

  static createCloseBtn(ctx, screen='MenuScene', scaleX=1, scaleY=1, x = config.width/2, y = 50) {
    let close_btn = ctx.add.image(x, y, 'close')
      .setInteractive()
      .setScale(scaleX, scaleY)
      .on('pointerdown', () => {ctx.scene.stop(); ctx.scene.run(screen)})
      return close_btn
  }

  static createFwdBtn(ctx, screen = 'Game', x = config.width - 100, y = 50) {
    ctx.add.image(x, y, 'fwdArrow')
      .setInteractive()
      .on('pointerdown', () => {ctx.scene.start(screen)})
  }

  static createBackwardBtn(ctx, screen = 'Game', x = 50, y = 50) {
    ctx.add.image(x, y, 'fwdArrow')
      .setScale(-1, 1)
      .setInteractive()
      .on('pointerdown', () => {ctx.scene.stop(); ctx.scene.start(screen)})
  }

  static createStartButton(ctx, screen = 'TutorialScene', x = config.width/2, y = config.height/2) {
    ctx.add.image(x, y, 'btn_start')
      .setInteractive()
      .on('pointerdown', function () {
        ctx.scene.start(screen)
      });
  }
}

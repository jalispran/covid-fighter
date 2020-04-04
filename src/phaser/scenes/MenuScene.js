import Phaser from "phaser";
import {config} from '../../index'

import AssetFactory from '../factories/AssetFactory'
import PlatformFactory from '../factories/PlatformFactory'

import btn_start from '../../assets/controls/transparentLight40.png'

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super("MenuScene");
    Phaser.Scene.call(this, { key: 'MenuScene' })
  }

  preload() {
    AssetFactory.loadAsset(this)
    PlatformFactory.loadMenuScreenPlatform(this)
    this.load.image('btn_start', btn_start)
  }

  create() {
    AssetFactory.createBackdrop(this)
    AssetFactory.createFullScreenBtn(this)

    let start_btn = this.add.image(config.width/2, config.height/2, 'btn_start')
    start_btn.setInteractive()
    start_btn.on('pointerdown', function () {
        this.scene.start('TutorialScene')
    }, this);

    PlatformFactory.createMenuScreenPlatform(this)

  }

}

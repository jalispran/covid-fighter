import Phaser from "phaser";
import {config} from '../../index'
import AssetFactory from '../factories/AssetFactory'
import PlatformFactory from '../factories/PlatformFactory'

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super("MenuScene");
    Phaser.Scene.call(this, { key: 'MenuScene' })
  }

  preload() {
    AssetFactory.loadAsset(this)
    PlatformFactory.loadMenuScreenPlatform(this)
  }

  create() {
    AssetFactory.createBackdrop(this)
    AssetFactory.createFullScreenBtn(this)
    AssetFactory.createStartButton(this, 'Game')
    PlatformFactory.createMenuScreenPlatform(this)
    this.add.text(config.width/2 - 400, config.height/2 - 100, 'Covid Fighter plays best in landscape mode', { fontSize: '32px', fill: '#000' });
  }

}

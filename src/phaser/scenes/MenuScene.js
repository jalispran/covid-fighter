import Phaser from "phaser";
import {config} from '../../index'

import backdrop from '../../assets/stage/BG/BG_large.png'
import ground from '../../assets/stage/Tiles/2.png'
import btn_start from '../../assets/controls/transparentLight40.png'
import fsIcon from '../../assets/controls/transparentLight28.png'

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super("MenuScene");
  }

  preload() {
    this.load.image('sky', backdrop)
    this.load.image('ground', ground);
    this.load.image('fs', fsIcon)
    this.load.image('btn_start', btn_start)
  }

  create() {
    this.add.image(config.width/2, config.height/2, 'sky');
    this.add.image(config.width-50, 50, 'fs')
      .setInteractive()
      .on('pointerup', () => {this.scale.toggleFullscreen()})

    let start_btn = this.add.image(config.width/2, config.height/2, 'btn_start')
    start_btn.setInteractive()
    start_btn.on('pointerdown', function () {
        this.scene.start('Game')
    }, this);

    for(let i=0; i<=config.width; i+=64){
        this.add.image(i, config.height-32, 'ground').setScale(0.5)
    }
  }

}

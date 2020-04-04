import Phaser from "phaser";
import {config} from '../../index'

import resume from '../../assets/controls/transparentLight14.png'

export default class PauseScene extends Phaser.Scene {
    constructor() {
      super('PauseScene')
      Phaser.Scene.call(this, { key: 'PauseScene' });
    }

    preload() {
      this.load.image('resume', resume)
    }

    create() {
      this.cameras.add(0, 0, config.width, config.height).setBackgroundColor('rgba(0, 0, 0, 0.5)')
      let btn_resume = this.add.image(config.width/2, config.height/2, 'resume')
      btn_resume.setScale(2)
      btn_resume.setInteractive()
        .on('pointerup', () => {
          this.scene.resume('Game')
          this.scene.stop();
        }, this)
    }
}

import Phaser from "phaser";
import {config} from '../../index'

import resume from '../../assets/controls/transparentLight14.png'
import close from '../../assets/controls/transparentLight33.png'

export default class PauseScene extends Phaser.Scene {
    constructor() {
      super('PauseScene')
      Phaser.Scene.call(this, { key: 'PauseScene' });
    }

    preload() {
      this.load.image('resume', resume)
      this.load.image('close', close)
    }

    create(data) {
      this.cameras.add(0, 0, config.width, config.height).setBackgroundColor('rgba(0, 0, 0, 0.5)')
      let btn_resume = this.add.image(config.width/2 + 200, config.height/2, 'resume')
      btn_resume.setScale(2)
      btn_resume.setInteractive()
        .on('pointerup', () => {
          this.scene.manager.scenes.map(s => {
            if(s.scene.manager.isPaused(s.scene.key)) {
              if(data.render === 'pause') {
                this.scene.resume(s.scene.key)
              } else {
                this.scene.stop(s.scene.key)
                this.scene.start(s.scene.key)
              }
              this.scene.stop()
              return
            }
          })
        }, this)

        let btn_close = this.add.image(config.width/2 - 200, config.height/2, 'close')
        btn_close.setInteractive()
        btn_close.setScale(2)
        btn_close.on('pointerup', () => {
          this.scene.manager.scenes.map(s => {
            if(s.scene.manager.isPaused(s.scene.key)) {
              this.scene.stop(s.scene.key)
              this.scene.stop()
              this.scene.run('MenuScene')
              return
            }
          })
        }, this)

        this.add.text(config.width/2-75, config.height/4, data.scoreText, { fontSize: '32px', fill: '#fff'})
    }

}

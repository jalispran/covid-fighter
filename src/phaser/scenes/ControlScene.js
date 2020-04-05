import Phaser from "phaser";
import {config} from '../../index'

export default class ControlScene extends Phaser.Scene {
  constructor() {
    super('ControlScene')
    Phaser.Scene.call(this, { key: 'ControlScene' });
    this.state = {}
  }

  create() {
    let control_area = 200
    let graphics = this.add.graphics({ fillStyle: { color: 'rgba(0, 0, 0)', alpha: 0.5 } });

    this.state.left_jump = new Phaser.Geom.Rectangle(0, 0, control_area, (config.height/2)-2);
    this.state.left = new Phaser.Geom.Rectangle(0, (config.height/2)+2, control_area, config.height);
    this.state.right_jump = new Phaser.Geom.Rectangle((config.width-control_area), 0, config.width, (config.height/2)-2);
    this.state.right = new Phaser.Geom.Rectangle((config.width-control_area), (config.height/2)+2, control_area, config.height);
    graphics.fillRectShape(this.state.left_jump);
    graphics.fillRectShape(this.state.left);
    graphics.fillRectShape(this.state.right_jump);
    graphics.fillRectShape(this.state.right);

    this.add.text(control_area/4, config.height/4, 'JUMP', { fontSize: '32px', fill: '#fff' });
    this.add.text(control_area/4, 3*config.height/4, 'LEFT', { fontSize: '32px', fill: '#fff' });
    this.add.text((config.width-3*control_area/4), config.height/4, 'JUMP', { fontSize: '32px', fill: '#fff' });
    this.add.text((config.width-3*control_area/4), 3*config.height/4, 'RIGHT', { fontSize: '32px', fill: '#fff' });
    this.add.text(config.width/4, config.height/2, 'BEWARE of the Bombs', { fontSize: '32px', fill: '#000' });

    this.input.on('pointerdown', () => {
      this.scene.stop()
    })

    this.input.keyboard.on('keydown', () => {
      this.scene.stop()
    })
  }
}

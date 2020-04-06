import Phaser from "phaser";

import PlayerFactory from '../factories/PlayerFactory'
import StarFactory from '../factories/StarFactory'
import PlatformFactory from '../factories/PlatformFactory'
import AssetFactory from '../factories/AssetFactory'

import bomb from '../../assets/bomb.png'

export default class TutorialScene extends Phaser.Scene {

  constructor() {
    super('TutorialScene')
    Phaser.Scene.call(this, { key: 'TutorialScene' })
    this.state = {
      bombTip: false,
      timeout: false,
    }
  }

  init() {
    this.state.timeout = false
  }

  preload() {
    PlayerFactory.loadPlayer(this)
    StarFactory.loadStar(this)
    PlatformFactory.loadTutorialScenePlatform(this)
    AssetFactory.loadAsset(this)
    this.load.image('bomb', bomb);
  }

  create() {
    AssetFactory.createBackdrop(this)
    AssetFactory.createFullScreenBtn(this)
    AssetFactory.createBackwardBtn(this, 'MenuScene')
    AssetFactory.createFwdBtn(this, 'Game')
    let platforms = PlatformFactory.createTutorialScenePlatorm(this)
    this.state.stars = StarFactory.createStar(this, 5)
    this.state.player_obj = PlayerFactory.createPlayer(this, 150)
    let {player} = this.state.player_obj

    this.state.bombs = this.physics.add.group();

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(this.state.stars, platforms);
    this.physics.add.collider(this.state.bombs, platforms);

    this.physics.add.collider(player, this.state.bombs, (player, bomb) => {
      this.physics.pause();
      player.setTint(0xff0000);
      player.anims.play('turn');
      setTimeout(() => {
        this.scene.restart()
      }, 2000)
    }, null, this);

    this.physics.add.overlap(player, this.state.stars, (player, star) => {
        star.disableBody(true, true);
      }, null, this);

    this.state.cursors = this.input.keyboard.createCursorKeys();

    this.input.addPointer()

  }

  update() {
    let {player, move} = this.state.player_obj
    let {cursors, bombs, stars, timeout} = this.state
    move.default_controls(this, cursors)

    if(!timeout) {
      this.scene.launch('ControlScene', {control: 'cursors'})
      this.state.timeout = true
    }

    if(stars.countActive(true) === 0) {
        //  A new batch of stars to collect
        stars.children.iterate(function (child) {
            child.enableBody(true, child.x, 0, true, true);
        });
        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        bomb.allowGravity = false;
    }
  }
}

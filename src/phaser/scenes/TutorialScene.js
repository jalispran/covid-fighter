import Phaser from "phaser";

import PlayerFactory from '../factories/PlayerFactory'
import StarFactory from '../factories/StarFactory'
import PlatformFactory from '../factories/PlatformFactory'
import AssetFactory from '../factories/AssetFactory'

import {collectStarInTutorial} from '../util/Helper'

export default class TutorialScene extends Phaser.Scene {

  constructor() {
    super('TutorialScene')
    Phaser.Scene.call(this, { key: 'TutorialScene' })
    this.state = {}
  }

  preload() {
    PlayerFactory.loadPlayer(this)
    StarFactory.loadStar(this)
    PlatformFactory.loadTutorialScenePlatform(this)
    AssetFactory.loadAsset(this)
  }

  create() {
    AssetFactory.createBackdrop(this)
    AssetFactory.createFullScreenBtn(this)
    let platforms = PlatformFactory.createTutorialScenePlatorm(this)
    let stars = StarFactory.createStar(this, 10)

    this.state.player_obj = PlayerFactory.createPlayer(this, 150)
    let {player} = this.state.player_obj

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);

    //TODO: collectStarInTutorial does not work properly
    this.physics.add.overlap(player, stars, collectStarInTutorial, null, this);

    this.state.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    let {move} = this.state.player_obj
    move.default_controls(this, this.state.cursors)
  }
}

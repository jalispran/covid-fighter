import Phaser from "phaser";
// import logoImg from "../assets/logo.png";
import backdrop from '../assets/stage/BG/BG.png'
import {config} from '../index'
import ground from '../assets/stage/Tiles/2.png'
import ground1 from '../assets/stage/Tiles/13.png'
import ground2 from '../assets/stage/Tiles/15.png'



class playGame extends Phaser.Scene {
  constructor() {
    super("PlayGame");
  }
  preload() {
    // this.load.image("logo", logoImg);
    this.load.image('bg', backdrop)
    this.load.image('ground', ground)
    this.load.image('ground1', ground1)
    this.load.image('ground2', ground2)
  }

  create() {
    let bg = this.add.image(config.width/2, config.height/2, 'bg')
    bg.setScale(0.8)
    // let logo = this.physics.add.sprite(400, 150, "logo");
    // logo.setCollideWorldBounds(true)

    let platforms = this.physics.add.staticGroup();
    for(let i=0; i<=config.width; i+=64){
        platforms.create(i, config.height-30, 'ground').setScale(0.5).refreshBody()
    }

    platforms.create(600, 300, 'ground1').setScale(0.5).refreshBody()
    platforms.create(664, 300, 'ground2').setScale(0.5).refreshBody()

    // this.physics.add.collider(logo, platforms);
  }
}

export default playGame;

import Phaser from "phaser";
import {config} from '../index'
import MovePlayer from './MovePlayer'

import backdrop from '../assets/stage/BG/BG_large.png'

import star from '../assets/star.png'
import bomb from '../assets/bomb.png'
import dude from '../assets/dude.png'

import ground from '../assets/stage/Tiles/2.png'
import ground1 from '../assets/stage/Tiles/13.png'
import middlegrnd from '../assets/stage/Tiles/14.png'
import ground2 from '../assets/stage/Tiles/15.png'

import one from '../assets/stage/Tiles/1.png'
import three from '../assets/stage/Tiles/3.png'
import twelve from '../assets/stage/Tiles/12.png'
import sixteen from '../assets/stage/Tiles/16.png'

import fsIcon from '../assets/controls/transparentLight28.png'
import pause from '../assets/controls/transparentLight12.png'

let player;
let stars;
let bombs;
let platforms;
let cursors;
let score = 0;
let gameOver = false;
let scoreText;

let movePlayer;

class Game extends Phaser.Scene {
  constructor() {
    super("Game");
    Phaser.Scene.call(this, { key: 'Game' });
  }

  //TODO: Use factories and MovePlayer#default_controls
  preload() {
    this.load.image('sky', backdrop);
    this.load.image('ground', ground);
    this.load.image('star', star);
    this.load.image('bomb', bomb);
    this.load.spritesheet('dude', dude, { frameWidth: 32, frameHeight: 48 });

    this.load.image('ground1', ground1)
    this.load.image('midlegrnd', middlegrnd)
    this.load.image('ground2', ground2)

    this.load.image('one', one)
    this.load.image('three', three)
    this.load.image('twelve', twelve)
    this.load.image('sixteen', sixteen)

    this.load.image('fs', fsIcon)
    this.load.image('pause', pause)

  }

  create() {
    //go fullscreen
    if(!this.scale.isFullscreen){
      this.scale.startFullscreen()
    }
      //  A simple background for our game
    this.add.image(config.width/2, config.height/2, 'sky');
    this.add.image(config.width - 50, 50, 'fs')
      .setInteractive()
      .on('pointerup', () => {this.scale.toggleFullscreen()})

      this.add.image(config.width - 150, 50, 'pause')
      .setInteractive()
      .on('pointerdown', () => {this.scene.pause(); this.scene.launch('PauseScene')})

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    for(let i=0; i<=config.width; i+=64){
        platforms.create(i, config.height-32, 'ground').setScale(0.5).refreshBody()
    }

    //  Now let's create some ledges
    //starting 'x' corodinate for platform 1
    let sxc1 = 32
    let syc1 = 260
    platforms.create(sxc1, syc1, 'midlegrnd').setScale(0.5).refreshBody()
    platforms.create(sxc1 = (sxc1 + 64), syc1, 'midlegrnd').setScale(0.5).refreshBody()
    platforms.create(sxc1 = (sxc1 + 64), syc1, 'midlegrnd').setScale(0.5).refreshBody()
    platforms.create(sxc1 = (sxc1 + 64), syc1, 'ground2').setScale(0.5).refreshBody()

    //starting 'x' corodinate for platform 2
    let sxc2 = sxc1 + 290
    let syc2 = 555
    platforms.create(sxc2, syc2, 'ground1').setScale(0.5).refreshBody()
    platforms.create(sxc2 = (sxc2 + 64), syc2, 'midlegrnd').setScale(0.5).refreshBody()
    platforms.create(sxc2 = (sxc2 + 64), syc2, 'midlegrnd').setScale(0.5).refreshBody()
    platforms.create(sxc2 = (sxc2 + 64), syc2, 'ground2').setScale(0.5).refreshBody()

    let sxc3 = sxc2 + 290
    let syc3 = 400
    platforms.create(sxc3, syc3, 'ground1').setScale(0.5).refreshBody()
    platforms.create(sxc3 = (sxc3 + 64), syc3, 'ground2').setScale(0.5).refreshBody()


    let sxc4 = (sxc2 + sxc1 + 290)/2
    let syc4 = 260
    platforms.create(sxc4, syc4, 'one').setScale(0.5).refreshBody()
    platforms.create(sxc4+64, syc4, 'three').setScale(0.5).refreshBody()
    platforms.create(sxc4, syc4+64, 'twelve').setScale(0.5).refreshBody()
    platforms.create(sxc4+64, syc4+64, 'sixteen').setScale(0.5).refreshBody()


    platforms.create(config.width-32, 250, 'ground1').setScale(0.5).refreshBody()

    // The player and its settings
    player = this.physics.add.sprite(100, 450, 'dude');

    //  Player physics properties. Give the little guy a slight bounce.
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    movePlayer = new MovePlayer(player)

    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();

    //  Some stars to collect, (repeat + 1) in total, evenly spaced 'stepX' pixels apart along the x axis
    let stepX = 74
    let tot_stars = (config.width) / stepX
    stars = this.physics.add.group({
        key: 'star',
        repeat: tot_stars,
        setXY: { x: 12, y: 0, stepX: stepX }
    });

    stars.children.iterate(function (child) {
        //  Give each star a slightly different bounce
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });

    bombs = this.physics.add.group();

    //  The score
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    //  Collide the player and the stars with the platforms
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(bombs, platforms);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.physics.add.overlap(player, stars, this.collectStar, null, this);

    this.physics.add.collider(player, bombs, this.hitBomb, null, this);

    this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('boy', { start: 15, end: 29 }),
        frameRate: 15,
        repeat: -1
    });

    this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNumbers('boy', { start: 60, end: 74 }),
        frameRate: 15,
        repeat: -1
    });

    this.anims.create({
        key: 'jump',
        frames: this.anims.generateFrameNumbers('boy', { start: 60, end: 74 }),
        frameRate: 15,
        repeat: -1
    });

    this.input.addPointer()

  }

  update() {
    if (gameOver){
      return;
    }

    if (cursors.left.isDown) {
      movePlayer.left()
    } else if (cursors.right.isDown) {
      movePlayer.right()
    } else if (this.input.activePointer.isDown) {
        if (this.input.activePointer.x > config.width - 200) {
          if(this.input.activePointer.y > (config.height/2)) {
            //right bottom corner
            movePlayer.right()
          } else if(player.body.touching.down) {
            //right top corner
            movePlayer.jump()
          }
        } else if (this.input.activePointer.x < 200) {
          if(this.input.activePointer.y > (config.height/2)) {
            //left bottom corner
            movePlayer.left()
          } else if(player.body.touching.down) {
            //left top corner
            movePlayer.jump()
          }
        }
    } else {
        movePlayer.stay_put()
    }

    if (cursors.up.isDown && player.body.touching.down){
      movePlayer.jump()
    }

  }

  collectStar(player, star){
    star.disableBody(true, true);

    //  Add and update the score
    score += 10;
    scoreText.setText('Score: ' + score);

    if (stars.countActive(true) === 0){
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

  hitBomb (player, bomb){
      this.physics.pause();

      player.setTint(0xff0000);

      player.anims.play('turn');

      gameOver = true;
  }

}

export default Game;

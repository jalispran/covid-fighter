import Phaser from "phaser";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
import MenuScene from './phaser/scenes/MenuScene'
import TutorialScene from './phaser/scenes/TutorialScene'
import Game from "./phaser/game";
import PauseScene from './phaser/scenes/PauseScene'
import ControlScene from './phaser/scenes/ControlScene'

let sceneList = [MenuScene, TutorialScene, Game, PauseScene, ControlScene]

export const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    parent: 'phaser',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    fullscreenTarget: 'phaser',
  },
  width: 1366,
  height: 768,
  scene: sceneList,
  physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },

};

const game = new Phaser.Game(config);

ReactDOM.render(
  <App />,
  document.getElementById("root") || document.createElement("div")
);

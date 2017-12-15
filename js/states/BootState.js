var BootState = function (game) {

};

BootState.prototype = {

  preload: function () {

  },

  create: function () {
    if (!isDebug) {
      this.game.add.plugin(Phaser.Plugin.Debug);
      game.add.plugin(Phaser.Plugin.Inspector);
    }
    game.add.plugin(PhaserSuperStorage.StoragePlugin);
    game.add.plugin(PhaserInput.Plugin);

    //Initial GameSystem (Arcade, P2, Ninja)
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //Initial Load State
    game.state.start('preload');

    gameConfig.fontStyles = {
      default: {
        align: 'center',
        font: '50px Signpainter',
        wordWrap: true,
        wordWrapWidth: (game.world.width - 30),
        stroke: 'rgba(255, 56, 112, 10)',
        fill: 'rgba(255, 243, 244, 0.85)',
        strokeThickness: 3
      },
      white: {
        font: '30px Courier',
        fill: '#fff',
        stroke: '#000',
        strokeThickness: 10
      },
      question: {
        align: 'center',
        font: '50px Signpainter',
        wordWrap: true,
        wordWrapWidth: (game.world.width - 30),
        fill: 'rgba(255, 56, 112, 20)',
        stroke: 'rgba(255, 243, 244, 0.85)',
        strokeThickness: 3
      }
    };
    gameConfig.scale = {
      x: Utils.getGameScaleX(),
      y: Utils.getGameScaleY()
    };

    /* @todo need fullscreen switch
    if (game.input.keyboard.justPressed(Phaser.Keyboard.F)) {
      // Maintain aspect ratio
      game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
      if (game.scale.isFullScreen) {
        game.scale.stopFullScreen();
      } else {
        game.scale.startFullScreen(false);
      }
    }
    */
  }
};

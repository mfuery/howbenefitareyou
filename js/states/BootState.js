var BootState = function (game) {

};

BootState.prototype = {

  preload: function () {

  },

  create: function () {
    if (isDebug) {
      this.game.add.plugin(Phaser.Plugin.Debug);
      game.add.plugin(Phaser.Plugin.Inspector);
    }
    game.add.plugin(PhaserSuperStorage.StoragePlugin);
    game.add.plugin(PhaserInput.Plugin);

    //Initial GameSystem (Arcade, P2, Ninja)
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //Initial Load State
    game.state.start('preload');

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

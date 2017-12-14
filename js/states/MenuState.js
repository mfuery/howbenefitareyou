var MenuState = function (game) {

};

MenuState.prototype = {

  create: function () {
    console.log('createMenuState');
    this.game.add.plugin(Phaser.Plugin.Debug);
    this.game.add.plugin(Phaser.Plugin.Inspector);
    this.game.add.plugin(PhaserSuperStorage.StoragePlugin);
    this.game.add.plugin(PhaserInput.Plugin);

    this.background = this.game.add.image(0, 0, 'outerspace');
    this.background.anchor.set(0.5);
    this.background.scale.setTo(getGameScale());
    this.background.x = this.game.world.centerX;
    this.background.y = this.game.world.centerY;
  },

  /**
   * Called from button press
   */
  startGame: function () {
    // @todo: add button to call this function
    this.game.state.start("Main");
  },

  resize: function() {

  }

};

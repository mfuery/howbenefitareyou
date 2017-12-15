var MenuState = function (game) {

};

MenuState.prototype = {

  create: function () {
    console.log('createMenuState');

    this.background = this.game.add.image(0, 0, 'outerspace');
    this.background.anchor.set(0.5);
    this.background.scale.setTo(getGameScale());
    this.background.x = this.game.world.centerX;
    this.background.y = this.game.world.centerY;
    this.game.state.start('game');
  },

  /**
   * Called from button press
   */
  startGame: function () {
    // @todo: add button to call this function
    this.game.state.start('game');

  },

  resize: function() {

  }

};

var MenuState = function (game) {

};

MenuState.prototype = {

  /**
   * Setup menu display objects.
   */
  create: function () {
    console.log('createMenuState');

    this.background = this.game.add.image(0, 0, 'outerspace');
    this.background.anchor.set(0.5);
    this.background.scale.setTo(getGameScale());
    this.background.x = this.game.world.centerX;
    this.background.y = this.game.world.centerY;
    this.game.state.start('game');

    this.background = new Background(game);
    this.ground = new Ground(game);

    this.start = game.add.button(0, 0, 'lift-off', this.startGame);
    this.start.anchor.set(0.5);
    this.start.scale.setTo(Utils.getGameScaleX());
    this.start.x = this.game.world.centerX;
    this.start.y = this.game.world.centerY;

    // @todo: add title and button text
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

var MenuState = function (game) {

};

MenuState.prototype = {

  /**
   * Setup menu display objects.
   */
  create: function () {
    console.log('createMenuState');

    this.background = new Background(game);
    this.ground = new Ground(game);

    this.start = game.add.button(0, 0, 'lift-off', this.startGame);
    this.start.anchor.set(0.5);
    this.start.scale.setTo(Utils.getGameScaleX());
    this.start.x = this.game.world.centerX;
    this.start.y = this.game.world.centerY;

    // @todo: add title and button text
    this.start.title = game.add.text(game.world.centerX, game.world.centerY - (this.start.height * .77), 'How Benefit Are You?', {
      font: '30px Signpainter',
      fill: '#fff'
    });

    //  Centers the text
    this.start.title.anchor.set(0.5);
    this.start.title.align = 'center';

    this.start.title.fontWeight = 'bold';
    this.start.title.fontSize = 130;

    var grd = this.start.title.context.createLinearGradient(0, 0, 0, this.start.title.height);

    //  Add in 2 color stops
    grd.addColorStop(0, '#8ED6FF');
    grd.addColorStop(1, '#004CB3');

    //  And apply to the Text
    this.start.title.fill = grd;

    // @todo: add title and button text
    this.start.button = game.add.text(game.world.centerX, game.world.centerY, 'START', {
      font: '30px Helvetica',
      fill: '#FF94FF'
    });
    this.start.button.anchor.set(0.5);
    this.start.button.align = 'center';
    this.start.button.fontWeight = 'bold';
    this.start.button.fontSize = 50;
    this.start.button.stroke = '#343434';
    this.start.button.strokeThickness = 2;
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

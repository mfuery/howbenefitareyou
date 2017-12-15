var MenuState = function (game) {

};

MenuState.prototype = {

  score: null,

  isResults: false,

  init: function(score) {
    if (score !== undefined) {
      this.isResults = true;
      this.score = score;
    }
  },

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

    var titleText = 'How Benefit Are You?';
    if (this.isResults) {
      titleText = 'Thanks your playing!\nFinal Score: ' + this.score + ' / 10';
    }
    this.start.title = game.add.text(game.world.centerX, game.world.centerY - (this.start.height * .77), titleText, {
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

    var startButtonStyle = {
      align: 'center',
      font: 'Helvetica',
      fontSize: (gameConfig.gameBaseFontSize * gameConfig.scale.x),
      fontWeight: 'bold',
      stroke: 'rgba(52, 52, 52, 1)',
      fill: 'rgba(255, 148, 255, 1)',
      strokeThickness: 2,
    };

    var buttonText = 'START';
    if (this.isResults) {
      buttonText = 'Play \nAgain';
    }
    this.start.button = game.add.text(game.world.centerX, game.world.centerY, 'START', startButtonStyle);
    this.start.button.anchor.set(0.5);
  },

  /**
   * Called from button press
   */
  startGame: function () {
    this.game.state.remove('game');
    game.state.add('game', GameState);
    this.game.state.start('game', true);
  },

  resize: function() {

  }

};

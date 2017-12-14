var preloadState = {

  preload: function () {

    /*
    Load all game assets
    Place your load bar, some messages.
    In this case of loading, only text is placed...
    */

    var loadingLabel = game.add.text(80, 150, 'loading...', {
      font: '30px Courier',
      fill: '#fff'
    });

    //Load your images, spritesheets, bitmaps...
    //game.load.image('boiler-logo', 'assets/img/boilerplate-logo.png');

    // @todo: Add BadGal image assets here


    //Load your sounds, efx, music...
    //Example: game.load.audio('rockas', 'assets/snd/rockas.wav');
    // @todo: Add BadGal audio assets here

    //Load your data, JSON, Querys...
    //Example: game.load.json('version', 'http://phaser.io/version.json');
    // @todo: Add BadGal JSON assets here

  },

  create: function () {

    game.stage.setBackgroundColor('#000');
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
    game.state.start('menu');
  }
};

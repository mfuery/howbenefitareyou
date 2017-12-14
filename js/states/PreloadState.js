var PreloadState = function (game) {

};

PreloadState.prototype = {

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
    game.load.image('alien-1', 'assets/img/alien-1.png');
    game.load.image('alien-2', 'assets/img/alien-2.png');
    game.load.image('alien-3', 'assets/img/alien-3.png');
    game.load.image('asdf', 'assets/img/asdf.png');
    game.load.image('ass-teroid', 'assets/img/ass-teroid.png');
    game.load.image('asteroid-2', 'assets/img/asteroid-2.png');
    game.load.image('asteroid-3', 'assets/img/asteroid-3.png');
    game.load.image('asteroid', 'assets/img/asteroid.png');
    game.load.image('astronaut', 'assets/img/astronaut.png');
    game.load.image('badgal-bang-brush', 'assets/img/badgal-bang-brush.png');
    game.load.image('badgal-bang-closed', 'assets/img/badgal-bang-closed.png');
    game.load.image('badgal-bang-open', 'assets/img/badgal-bang-open.png');
    game.load.image('BANG', 'assets/img/BANG.png');
    game.load.image('buy', 'assets/img/buy.png');
    game.load.image('desert', 'assets/img/desert.png');
    game.load.image('down-arrow', 'assets/img/down-arrow.png');
    game.load.image('dude', 'assets/img/dude.png');
    game.load.image('dugout', 'assets/img/dugout.png');
    game.load.image('earth', 'assets/img/earth.png');
    game.load.image('earthmosphere', 'assets/img/earthmosphere.png');
    game.load.image('emergency-exit', 'assets/img/emergency-exit.png');
    game.load.image('kitty', 'assets/img/kitty.png');
    game.load.image('laser', 'assets/img/laser.png');
    game.load.image('lift-off', 'assets/img/lift-off.png');
    game.load.image('model-1', 'assets/img/model-1.gif');
    game.load.image('model-2', 'assets/img/model-2.gif');
    game.load.image('model-3', 'assets/img/model-3.gif');
    game.load.image('outerspace', 'assets/img/outerspace.jpg');
    game.load.image('rocket-small', 'assets/img/rocket-small.png');
    game.load.image('spaceship-blastoff', 'assets/img/spaceship-blastoff.gif');
    game.load.image('spaceship', 'assets/img/spaceship.png');
    game.load.image('tooltip-brush', 'assets/img/tooltip-brush.png');
    game.load.image('tooltip-formula', 'assets/img/tooltip-formula.png');
    game.load.image('UFO', 'assets/img/UFO.png');

    // Videos
    game.load.video('bigbang', 'assets/img/bigbang.mp4');

    // Load your sounds, efx, music...
    game.load.audio('explosion-1', 'assets/mp3/explosion-1.mp3');
    game.load.audio('laser-shoot-1', 'assets/mp3/laser-shoot-1.mp3');
    game.load.audio('power-2', 'assets/mp3/power-2.mp3');
    game.load.audio('powerup-1', 'assets/mp3/powerup-1.mp3');

    //Load your data, JSON, Querys...
    //Example: game.load.json('version', 'http://phaser.io/version.json');
    // @todo: Add BadGal JSON assets here

  },

  create: function () {
    game.stage.setBackgroundColor('#000');
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
    //game.state.start('menu');
    game.state.start('game');
  }
};

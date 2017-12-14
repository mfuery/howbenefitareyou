//var w = 640;
//var h = 480;

var w = window.innerWidth * window.devicePixelRatio;
var h = window.innerHeight * window.devicePixelRatio;

var game = new Phaser.Game(w, h, Phaser.AUTO, 'gameContainer');

game.state.add('boot', BootState);
game.state.add('preload', PreloadState);
game.state.add('menu', MenuState);
game.state.add('game', GameState);
game.state.add('results', ResultsState);

game.state.start('boot');


var gameConfig = {
  width: '100%',
  //width: window.innerWidth * window.devicePixelRatio,
  height: '100%',
  //height: window.innerHeight * window.devicePixelRatio,
  baseWidth: 1280,
  baseHeight: 800,
  renderer: Phaser.AUTO,
  antialias: true,
  multiTexture: true,
  parent: 'gameContainer',
  scaleMode: Phaser.ScaleManager.NO_SCALE
  // state: {
  //   boot: BootState,
  //   preload: PreloadState
  //   create: create,
  //   update: update
  // }
};

game = new Phaser.Game(gameConfig);

game.state.add('boot', BootState);
game.state.add('preload', PreloadState);
game.state.add('menu', MenuState);
game.state.add('game', GameState);
game.state.add('results', ResultsState);

game.state.start('boot');
game.difficulty = 4;

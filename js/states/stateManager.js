
var gameConfig = {
  width: '100%',//window.innerWidth * window.devicePixelRatio,
  height: '100%',//window.innerHeight * window.devicePixelRatio,
  renderer: Phaser.AUTO,
  antialias: true,
  multiTexture: true,
  parent: 'gameContainer',
  scaleMode: Phaser.ScaleManager.SHOW_ALL
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

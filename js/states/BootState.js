var BootState = function (game) {

};

BootState.prototype = {

  preload: function () {

  },

  create: function () {
    if (!window.location.href.indexOf('herokuapp')) {
      // this.game.add.plugin(Phaser.Plugin.Debug);
      // game.add.plugin(Phaser.Plugin.Inspector);
    }
    game.add.plugin(PhaserSuperStorage.StoragePlugin);
    game.add.plugin(PhaserInput.Plugin);

    //Initial GameSystem (Arcade, P2, Ninja)
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //Initial Load State
    game.state.start('preload');
  }
};

var BootState = function (game) {

};

BootState.prototype = {

  preload: function () {

  },

  create: function () {
    //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    //this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
    //this.scale.setScreenSize(true);

    //Initial GameSystem (Arcade, P2, Ninja)
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //game.add.plugin(Phaser.Plugin.Debug);
    //game.add.plugin(Phaser.Plugin.Inspector);
    game.add.plugin(PhaserSuperStorage.StoragePlugin);
    game.add.plugin(PhaserInput.Plugin);

    //Initial Load State
    game.state.start('preload');
  }
};

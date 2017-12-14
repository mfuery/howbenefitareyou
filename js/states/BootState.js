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

    //Initial Load State
    game.state.start('preload');
  }
};

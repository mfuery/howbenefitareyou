var ResultsState = function (game) {

};

ResultsState.prototype = {

  create: function () {
    game.add.plugin(Phaser.Plugin.Debug);
    game.add.plugin(Phaser.Plugin.Inspector);
    game.add.plugin(PhaserSuperStorage.StoragePlugin);
    game.add.plugin(PhaserInput.Plugin);

    // @todo: do resultsState create stuff here.
  }
};

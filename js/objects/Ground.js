var Ground = function (game) {
  Phaser.Image.call(this, game, 0, 0, "desert");

  game.add.existing(this);

  this.anchor.y = 1;
  this.scale.setTo(Utils.getGameScaleX());
  this.y = this.game.world.height + (this.height * .2);
};

Ground.prototype = Object.create(Phaser.Image.prototype);
Ground.prototype.constructor = Ground;



Ground.prototype.resize = function () {
  // @todo: update position when screen is resized
};

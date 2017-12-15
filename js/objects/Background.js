var Background = function (game) {
  Phaser.Sprite.call(this, game, 0, 0, "outerspace");

  game.add.existing(this);

  this.anchor.set(0.5);
  this.scale.setTo(Utils.getGameScaleY());
  this.x = this.game.world.centerX;
  this.y = this.game.world.centerY;
};

Background.prototype = Object.create(Phaser.Sprite.prototype);
Background.prototype.constructor = Background;

Background.prototype.update = function () {
  // @todo: add particle effects or something.
};

Background.prototype.resize = function () {
  // @todo: update position/scale when screen is resized
};


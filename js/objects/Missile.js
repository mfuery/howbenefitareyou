var Missile = function (game) {
  Phaser.Sprite.call(this, game, 0, 0, "rocket-small");

  game.add.existing(this);

  this.anchor.x = 0.5;
  this.anchor.y = 1;
  this.scale.setTo(Utils.getGameScaleX());
  this.x = this.game.world.centerX;
  this.y = this.game.world.height - (this.height * .35);

  this.scale.x = this.scale.y = Utils.getGameScaleX();

};

Missile.prototype = Object.create(Phaser.Sprite.prototype);
Missile.prototype.constructor = Missile;

Missile.prototype.update = function () {

};

Missile.prototype.resize = function () {
  // @todo: update position when screen is resized
};


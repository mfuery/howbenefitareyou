var Core = function (game, asteroid) {
  //game, parent, name, addToStage, enableBody, physicsBodyType
  Phaser.Group.call(this, game);

  game.add.existing(this);

  this.asteroid = asteroid;



  //this.anchor.set(0.5);
  //this.scale.setTo(Utils.getGameScaleY());
  //this.x = this.game.world.centerX;
  //this.y = this.game.world.centerY;
};

Core.prototype = Object.create(Phaser.Group.prototype);
Core.prototype.constructor = Core;

Core.prototype.update = function () {
  // @todo: add particle effects or something.
};

Core.prototype.resize = function () {
  // @todo: update position/scale when screen is resized
};


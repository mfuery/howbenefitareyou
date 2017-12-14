var Asteroid = function (game, x, y) {

  Phaser.Sprite.call(this, game, x, y, "asteroid");
  //Phaser.Sprite.call(this, game, x, y, "asteroid-2");
  //Phaser.Sprite.call(this, game, x, y, "asteroid-3");

  game.add.existing(this);
};

Asteroid.prototype = Object.create(Phaser.Sprite.prototype);
Asteroid.prototype.constructor = Asteroid;

Asteroid.prototype.update = function () {
  // @todo: add "wiggle" animation.
};

Asteroid.prototype.resize = function () {
  // @todo: update position when screen is resized
};

// render
//

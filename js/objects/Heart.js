var Heart = function (game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'heart');
  this.anchor.set('0.5');
  this.alpha = 0;
};

Heart.prototype = Object.create(Phaser.Sprite.prototype);
Heart.prototype.constructor = Heart;

Heart.prototype.update = function () {
};

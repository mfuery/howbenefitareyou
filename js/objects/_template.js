var Thing = function (game, x, y) {
  Phaser.Sprite.call(this, game, x, y, "thing");

};

Thing.prototype = Object.create(Phaser.Sprite.prototype);
Thing.prototype.constructor = Thing;

Thing.prototype.update = function () {

};

Thing.prototype.resize = function () {

};

// render
//

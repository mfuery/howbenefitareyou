var Asteroid = function (game, settings) {
  this.settings = Object.assign({
    startY: 25, // in px
    verticalSpeed: 5, // in px per sec
    rotationSpeed: 0.05,
    sprite: null
  }, settings);

  var sprites = ['asteroid', 'asteroid-2', 'asteroid-3'];

  Phaser.Sprite.call(this, game, this.settings.startX, this.settings.startY, "asteroid");

  if (!this.settings.sprite) {
    // Choose random sprite
    this.settings.sprite = sprites[Math.floor(Math.random() * sprites.length)];
  }

  game.add.existing(this);

  this.scale.x = this.scale.y = getGameScale();
  this.anchor.set(0.5);
  this.settings.rotationSpeed += Math.floor(Math.random() * 0.1) * (Math.random() > 0.5 ? -1 : 1);

  // This is velocity via arcade physics
  this.game.physics.arcade.enable(this);
  this.settings.verticalSpeed = this.game.difficulty * 20 +
    (this.game.difficulty * Math.floor(Math.random() * 10)
      * (Math.random() > 0.5 ? -1 : 1));
  // console.log(['gravity/rotation:',' ', this.body.gravity.y, '/', this.settings.rotationSpeed].join('/'));

  // This is tweening
  // this.game.add.tween(this.body)
  //   .to({y: this.ga}, 3000, Phaser.Easing.Linear.None, true);
};

Asteroid.prototype = Object.create(Phaser.Sprite.prototype);
Asteroid.prototype.constructor = Asteroid;

Asteroid.prototype.update = function () {
  // @todo: add "wiggle" animation.
  this.body.velocity.y = this.settings.verticalSpeed;
  this.rotation += this.settings.rotationSpeed;
};

Asteroid.prototype.resize = function () {
  // @todo: update position when screen is resized
};

Asteroid.prototype.destroy = function () {
  // render
};

// var AsteroidGroup = function(number) {
//   this.number = number;
//
//   this.create.call(this);
// };
//
// AsteroidGroup.prototype = {
//   asteroids: [],
//
//   create: function() {
//     for (var i = 0; i < this.number, i++) {
//
//     }
//   }
// };

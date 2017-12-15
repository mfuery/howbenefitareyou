var Asteroid = function (game, settings) {
  this.settings = Object.assign({
    startY: 25, // in px
    startX: game.world.centerX,
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

  this.scale.x = this.scale.y = Utils.getGameScaleX();
  this.anchor.set(0.5);
  this.settings.rotationSpeed += Math.floor(Math.random() * 0.1) * (Math.random() > 0.5 ? -1 : 1);

  // This is velocity via arcade physics
  this.game.physics.arcade.enable(this);
  this.settings.verticalSpeed = this.game.difficulty * 20 +
    (this.game.difficulty * Math.floor(Math.random() * 10)
      * (Math.random() > 0.5 ? -1 : 1));
  console.log(['vSpeed/rotation:',' ',  this.settings.verticalSpeed, '/', this.settings.rotationSpeed].join('/'));
  this.body.gravity.y = this.settings.verticalSpeed;

  // This is tweening
  // this.game.add.tween(this.body)
  //   .to({y: this.ga}, 3000, Phaser.Easing.Linear.None, true);
};

Asteroid.prototype = Object.create(Phaser.Sprite.prototype);
Asteroid.prototype.constructor = Asteroid;

Asteroid.prototype.update = function () {
  // @todo: add "wiggle" animation.
  this.rotation += this.settings.rotationSpeed;

  if (this.y > this.game.world.height) {
    this.destroy();
  }
};

Asteroid.prototype.resize = function () {
  // @todo: update position when screen is resized
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

var Asteroid = function (game, settings) {
  this.settings = Object.assign({
    startY: 25, // in px
    startX: game.world.centerX,
    verticalSpeed: 40,
    rotationSpeed: 0.05,
    sprite: null
  }, settings);

  var sprites = ['asteroid', 'asteroid-2', 'asteroid-3'];
  var rotations = [0.001, 0.002, 0.003, 0.004, 0.005];

  Phaser.Sprite.call(this, game, this.settings.startX, this.settings.startY, "asteroid");

  if (!this.settings.sprite) {
    // Choose random sprite
    this.settings.sprite = sprites[Math.floor(Math.random() * sprites.length)];
  }

  game.add.existing(this);

  this.scale.x = this.scale.y = Utils.getGameScaleX();
  this.anchor.set(0.5);
  this.settings.verticalSpeed += Math.random() * 20;

  // This is velocity via arcade physics
  this.game.physics.arcade.enable(this);
  this.settings.rotationSpeed = rotations[Math.floor(Math.random() * rotations.length)] * (Math.random() > 0.5 ? -1 : 1);
    // this.game.difficulty * 20 +
    // (this.game.difficulty * Math.floor(Math.random() * 10)
    //   * (Math.random() > 0.5 ? -1 : 1));
  console.log(['vSpeed/rotation:',' ',  this.settings.verticalSpeed, '/', this.settings.rotationSpeed].join('/'));
  this.body.gravity.y = this.settings.verticalSpeed;

  // This is tweening
  // this.game.add.tween(this.body)
  //   .to({y: this.ga}, 3000, Phaser.Easing.Linear.None, true);

  // Sounds
  this.soundExplosion1 = this.game.add.audio('explosion-1');//new Phaser.Sound(this.game, 'explosion-1');
  this.isAlive = true;

  // Events
  this.events.onKilled = this.onKilled;
};

Asteroid.prototype.onKilled = function() {
  console.log('oops');
}

Asteroid.prototype = Object.create(Phaser.Sprite.prototype);
Asteroid.prototype.constructor = Asteroid;

Asteroid.prototype.update = function () {
  // @todo: add "wiggle" animation.
  this.rotation += this.settings.rotationSpeed;
  this.textObject.rotation -= this.settings.rotationSpeed;

  if (this.isAlive && this.y > game.world.height - (20 * Utils.getGameScaleY())) {
    this.soundExplosion1.play();
    this.isAlive = false;
    this.explode();
  }
};

/**
 *
 * @param text
 * @param isCorrect bool
 */
Asteroid.prototype.setAnswer = function (text, isCorrect) {
  this.textObject = new Phaser.Text(this.game, 0, 0, text, {
    'backgroundColor': 'pink'
  });
  this.addChild(this.textObject);
};

Asteroid.prototype.explode = function() {
  // @todo particle fx!
  // hide rock img
  this.texture.destroy();

  // when done with particles
  this.destroy();
};

Asteroid.prototype.stop = function() {

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

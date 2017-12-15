var Missile = function (game) {
  Phaser.Sprite.call(this, game, 0, 0, "rocket-small");

  game.add.existing(this);

  this.anchor.x = 0.5;
  this.anchor.y = 1;
  this.scale.setTo(Utils.getGameScaleX());
  this.start = new Phaser.Point();
  this.x = this.start.x = this.game.world.centerX;
  this.y = this.start.y = this.game.world.height - (this.height * .35);
  this.firing = false;

  this.scale.x = this.scale.y = Utils.getGameScaleX();

  game.eventDispatcher.add(this.handleEvent, this);

  game.physics.arcade.enable(this);
  this.enableBody = true;
  //this.body.allowRotation = false;

  // Exhaust emitter
  this.emitter = game.add.emitter(this.x, this.y, 500);
  this.emitter.makeParticles(['tiny-heart']);
  this.emitter.minParticleScale = 0.7;
  this.emitter.maxParticleScale = 1;
  this.emitter.setYSpeed(300, 500);
  this.emitter.setXSpeed(-500, 500);
  this.emitter.start(false, 1600, 5);

};

Missile.prototype = Object.create(Phaser.Sprite.prototype);
Missile.prototype.constructor = Missile;

Missile.prototype.update = function () {
  var mouseRotation = this.game.physics.arcade.angleToPointer(this) + (90 * Phaser.Math.DEG_TO_RAD);
  if (!this.firing && mouseRotation > -1 && mouseRotation < 1) {
    this.rotation = mouseRotation;
  }

  this.emitter.x = this.x;
  this.emitter.y = this.y;
};

/**
 *
 */
Missile.prototype.resize = function () {
  // @todo: update position when screen is resized
};

/**
 *
 */
Missile.prototype.handleEvent = function(event) {
  if (event.eventType === 'answered') {
    // console.log('this', this);
    // console.log('event.asteroid', event.asteroid);
    this.firing = true;

    this.rotation = this.game.physics.arcade.angleBetween(this, event.asteroid) + (90 * Phaser.Math.DEG_TO_RAD);
    this.diff = new Phaser.Point();
    this.diff.x = event.asteroid.x - this.x;
    this.diff.y = event.asteroid.y - this.y;

    var shootTween = game.add.tween(this).to({x: event.asteroid.position.x}, 500, Phaser.Easing.Exponential.In, true);
    game.add.tween(this).to({y: event.asteroid.position.y}, 500, Phaser.Easing.Exponential.In, true);

    shootTween.onComplete.add(function (tweenEvent) {
      this.body.velocity.x = this.diff.x * 3;
      this.body.velocity.y = this.diff.y * 3;
      game.eventDispatcher.dispatch({eventType: 'detonate', asteroid: event.asteroid});
      this.emitter.destroy();
    }, this);


  }
};


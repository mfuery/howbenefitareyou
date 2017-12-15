var Missile = function (game) {
  Phaser.Sprite.call(this, game, 0, 0, "rocket-small");

  game.add.existing(this);

  this.anchor.x = 0.5;
  this.anchor.y = 1;
  this.scale.setTo(Utils.getGameScaleX());
  this.x = this.game.world.centerX;
  this.y = this.game.world.height - (this.height * .35);
  this.firing = false;

  this.scale.x = this.scale.y = Utils.getGameScaleX();

  game.eventDispatcher.add(this.handleEvent, this);
};

Missile.prototype = Object.create(Phaser.Sprite.prototype);
Missile.prototype.constructor = Missile;

Missile.prototype.update = function () {
  var mouseRotation = this.game.physics.arcade.angleToPointer(this) + (90 * Phaser.Math.DEG_TO_RAD);
  if (!this.firing && mouseRotation > -1 && mouseRotation < 1) {
    this.rotation = mouseRotation;
  }
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
    console.log('this', this);
    console.log('event.asteroid', event.asteroid);
    this.firing = true;

    this.rotation = this.game.physics.arcade.angleBetween(this, event.asteroid) + (90 * Phaser.Math.DEG_TO_RAD);

    var shootTween = game.add.tween(this).to({x: event.asteroid.position.x}, 500, Phaser.Easing.Exponential.In, true);
    game.add.tween(this).to({y: event.asteroid.position.y}, 500, Phaser.Easing.Exponential.In, true);

    shootTween.onComplete.add(function (event) {
      game.eventDispatcher.dispatch({eventType: 'detonate'});
    }, this);

    // @todo: handle animation to keep going based on current rotation.
  }
};


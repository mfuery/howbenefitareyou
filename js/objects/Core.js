var Core = function (game, asteroid) {
  this.game = game;
  this.asteroid = asteroid;
  this.isClicked = false;
  this.isCorrect = this.asteroid.isCorrect;
  this.imageName = (this.isCorrect ? 'heart' : 'red-x');

  Phaser.Sprite.call(this, game, asteroid.x, asteroid.y, this.imageName);
  this.game.add.existing(this);
  this.anchor.set(0.5);
  this.alpha = 0;

  //game, parent, name, addToStage, enableBody, physicsBodyType
  this.scaleMax = 1;
  this.scale.setTo(Utils.getGameScaleX());

  // this.x = this.asteroid.x;
  // this.y = this.asteroid.y;

  game.eventDispatcher.add(this.handleEvent, this);
};

Core.prototype = Object.create(Phaser.Sprite.prototype);
Core.prototype.constructor = Core;

Core.prototype.update = function () {
  // @todo: add particle effects or something.
};

Core.prototype.resize = function () {
  // @todo: update position/scale when screen is resized
};


Core.prototype.handleEvent = function(event) {
  switch(event.eventType) {
    case 'answered':
      this.handleAnswered(event);
      break;

    case 'detonate':
      var floatTween = game.add.tween(this)
        .to({alpha: 1}, 1000, Phaser.Easing.Exponential.In, true);
      break;

    case 'vaporized':
      this.handleVaporized(event);
      break;
  }
};

/**
 * Event handler to show core and check if clicked asteroid relates to this core.
 * @param event
 */
Core.prototype.handleAnswered = function(event) {
  //console.log('Core handleAnswered');

  if (this.asteroid === event.asteroid) {
    this.isClicked = true;
  }

  this.x = this.asteroid.x;
  this.y = this.asteroid.y;

  //game.eventDispatcher.dispatch({'eventType': 'scored', 'score': this.asteroid.});
};

Core.prototype.handleVaporized = function(event) {
  console.log('Core: event' + event.eventType);

  if (this.isClicked) {
    if (this.isCorrect) {
      // @todo: animate heart to top right.
      // this.rotation = this.game.physics.arcade.angleBetween(this, event.asteroid) + (90 * Phaser.Math.DEG_TO_RAD);

      setTimeout(function() {
        var floatTween = this.game.add.tween(this).to({
            y: this.game.world.height - (30 * Utils.getGameScaleY())
        }, 1000, Phaser.Easing.Exponential.Out, true);
        this.game.add.tween(this).to({
            x: this.game.width - (30 * Utils.getGameScaleX())
        }, 2000, Phaser.Easing.Exponential.Out, true);
      }.bind(this), 700);
    }

    setTimeout(function() {
      if (this.game) {
        // The game state may have already changed during the countdown.
        this.game.eventDispatcher.dispatch({
          'eventType': 'scored',
          'score': this.isCorrect
        });
      }
    }.bind(this), 3000);
  }
};

var Core = function (game, asteroid) {
  //game, parent, name, addToStage, enableBody, physicsBodyType
  Phaser.Group.call(this, game);

  game.add.existing(this);

  this.asteroid = asteroid;
  this.isClicked = false;
  this.isCorrect = this.asteroid.isCorrect;


  // @todo: add heart and red X.


  //this.anchor.set(0.5);
  this.scale.setTo(Utils.getGameScaleX());

  this.heart = new Heart(game, 50, 50);
  this.x = 50;
  this.y = 50;
  //game.add.existing(this.heart);
  //this.add(this.heart);

  this.add(this.heart);
  //this.x = this.game.world.centerX;
  //this.y = this.game.world.centerY;

  game.eventDispatcher.add(this.handleEvent, this);
};

Core.prototype = Object.create(Phaser.Group.prototype);
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
    case 'vaporized':
      this.handleVaporized(event);
      break;
  }
};

/**
 * Event handler to show core and check if clicked asteroid relates to this core.
 * @param event
 */
Core.prototype.handleAnswered = function (event) {
  console.log('Core: event' + event.eventType);

  if (this.asteroid === event.asteroid) {
    console.log('*** SAME ASTEROID ***');
    this.isClicked = true;
  }

  this.x = this.asteroid.x;
  this.y = this.asteroid.y;

  //game.eventDispatcher.dispatch({'eventType': 'scored', 'score': this.asteroid.});
};

Core.prototype.handleVaporized = function (event) {
  console.log('Core: event' + event.eventType);
  // @todo: animate heart to top right.
  if (this.isClicked) {
    game.eventDispatcher.dispatch({
      'eventType': 'scored',
      'score': this.isCorrect
    });
  }
};

var Asteroid = function (game, settings) {
  this.settings = Object.assign({
    startY: 45, // in px
    startX: game.world.centerX, // in px
    verticalSpeed: 0,
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

  // Movement
  this.scale.x = this.scale.y = Utils.getGameScaleX();
  this.anchor.set(0.5);

  // This is velocity via arcade physics
  this.game.physics.arcade.enable(this);
  this.settings.rotationSpeed = rotations[Math.floor(Math.random() * rotations.length)] * (Math.random() > 0.5 ? -1 : 1);
    // this.game.difficulty * 20 +
    // (this.game.difficulty * Math.floor(Math.random() * 10)
    //   * (Math.random() > 0.5 ? -1 : 1));
  //console.log(['vSpeed/rotation:',' ', this.settings.verticalSpeed, '/', this.settings.rotationSpeed].join('/'));

  // Sounds
  this.soundExplosion1 = this.game.add.audio('explosion-1');
  this.isAlive = true;

  //
  this.alpha = 0;

  // Events
  this.game.eventDispatcher.add(this.handleEvent, this);

  this.game.input.onDown.add(this.explode, this);
};

Asteroid.prototype = Object.create(Phaser.Sprite.prototype);
Asteroid.prototype.constructor = Asteroid;

Asteroid.prototype.update = function () {
  if (this.body) {
    this.body.gravity.y = this.settings.verticalSpeed;
  }
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
Asteroid.prototype.setAnswer = function(text, isCorrect) {
  this.textObject = new Phaser.Text(this.game, 0, 0, text, {
    'backgroundColor': '#ff7380'
  });
  this.addChild(this.textObject);

  this.isCorrect = isCorrect;
};

Asteroid.prototype.handleEvent = function(event) {
  console.log('Asteroid event: ' + event.eventType);

  switch(event.eventType) {
    case 'beginFalling':
      var beginTween = this.game.add.tween(this)
        .to({alpha:1}, 2000, Phaser.Easing.Linear.None).start();

      beginTween.onComplete.add(function(event) {
        this.settings.verticalSpeed =  50 + (Math.random() * 20);
      }, this);
      break;

    case 'answered':
      this.settings.verticalSpeed = 0;
      break;

    case 'blowUp':
      if (this.isCorrect) {
        // burst of hearts
        this.explode();
        // pink heart
        this.game.eventDispatcher.dispatch({eventType: 'asteroidDone', score: 1});
      } else {
        // fade out
        var tween = this.game.add.tween(this).to({alpha: 0}, 1000, Phaser.Easing.Linear.None).start();

        // Red X
        tween.onComplete.add(function() {
          this.eventDispatcher.dispatch({eventType: 'blownUp'});
        }, this);
      }
      break;

    default: break;
  }
};

Asteroid.prototype.explode = function() {
  // @todo particle fx! Only correct answer explodes
  var emitter = game.add.emitter(0, 0, 100);

  emitter.makeParticles('heart-tiny');
  emitter.gravity = 300;

  emitter.x = this.x;
  emitter.y = this.y;

  //  The first parameter sets the effect to "explode" which means all particles are emitted at once
  //  The second gives each particle a 2000ms lifespan
  //  The third is ignored when using burst/explode mode
  //  The final parameter (10) is how many particles will be emitted in this single burst
  emitter.start(true, 4000, null, 25);

  // when done with particles
  this.destroy();
};

Asteroid.prototype.resize = function () {
  // @todo: update position when screen is resized
};

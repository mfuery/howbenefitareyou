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
  this.inputEnabled = true;
  this.events.onInputDown.add(function() {
    this.game.eventDispatcher.dispatch({eventType: 'answered', asteroid: this});
  }, this);
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
  console.log(text);
  var asteriodTextWidth = (this.width * 1.3);
  var style = {
    align: 'left',
    wordWrap: true,
    wordWrapWidth: asteriodTextWidth,
    backgroundColor: 'rgba(255, 115, 128, 0)',
    stroke: 'rgba(255, 243, 244, 0.95)',
    strokeThickness: 3,
  };
  this.textObject = new Phaser.Text(this.game, 0, (this.height * .5), text, style);
  this.textObject.anchor.set(0.5);
  this.addChild(this.textObject);

  this.isCorrect = isCorrect;
};

/**
 *
 * @param event
 */
Asteroid.prototype.handleEvent = function(event) {
  console.log('Asteroid event: ' + event.eventType);

  switch(event.eventType) {
    case 'dropNow':
      var beginTween = this.game.add.tween(this)
        .to({alpha:1}, 2000, Phaser.Easing.Linear.None).start();

      beginTween.onComplete.add(function(event) {
        this.settings.verticalSpeed =  50 + (Math.random() * 20);
      }, this);
      break;

    case 'answered':
      this.settings.verticalSpeed = 0;
      break;

    case 'detonate':
      if (this.isCorrect) {
        // burst of gold glitter
        this.explode();
        this.alpha = 0;
        this.game.eventDispatcher.dispatch({eventType: 'asteroidDone', score: 1});
      } else {
        // fade out
        var tween = this.game.add.tween(this).to({alpha: 0}, 1000, Phaser.Easing.Linear.None).start();

        // Red X
        tween.onComplete.add(function() {
          this.eventDispatcher.dispatch({eventType: 'blownUp'});
        }, this);
      }
      // fade out
      var tween = this.game.add.tween(this)
        .to({alpha: 0}, 1000, Phaser.Easing.Linear.None).start();

      tween.onComplete.add(function() {
        console.log('Asteroid: vaporized');
        this.game.eventDispatcher.dispatch({eventType: 'vaporized'});
        // when done with particles
        this.destroy();
      }, this);
      break;

    default: break;
  }
};

/**
 * Explosion animation
 */
Asteroid.prototype.explode = function() {
  // Particle fx! Only correct answer explodes
  var emitter = game.add.emitter(0, 0, 100);

  emitter.makeParticles(['gold-1', 'gold-2', 'gold-3', 'gold-4'], undefined, 40, false, true);
  emitter.gravity = 300;

  emitter.x = this.x;
  emitter.y = this.y;

  //  The first parameter sets the effect to "explode" which means all particles are emitted at once
  //  The second gives each particle a 2000ms lifespan
  //  The third is ignored when using burst/explode mode
  //  The final parameter (10) is how many particles will be emitted in this single burst
  emitter.start(true, 4000, null, 50);

  this.soundExplosion1.play();
};

/**
 *
 */
Asteroid.prototype.resize = function () {
  // @todo: update position when screen is resized
};

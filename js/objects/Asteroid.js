var Asteroid = function (game, settings) {
  this.settings = Object.assign({
    startY: 250, // in px
    startX: game.world.centerX, // in px
    verticalSpeed: 0,
    rotationSpeed: 0.05,
    sprite: null,
    textValue: 'DEFAULT VALUE',
    isCorrect: 0
  }, settings);

  var sprites = ['asteroid', 'asteroid-2', 'asteroid-3'];
  var rotations = [0.001, 0.002, 0.003, 0.004, 0.005];

  if (!this.settings.sprite) {
    // Choose random sprite
    this.settings.sprite = sprites[Math.floor(Math.random() * sprites.length)];
  }

  Phaser.Sprite.call(this, game, this.settings.startX, this.settings.startY, this.settings.sprite);
  game.add.existing(this);

  this.setAnswer(this.settings.textValue, this.settings.isCorrect);

  // Movement
  this.scale.x = this.scale.y = Utils.getGameScaleX();
  this.anchor.set(0.5);

  // This is velocity via arcade physics
  this.game.physics.arcade.enable(this);
  this.settings.rotationSpeed = rotations[Math.floor(Math.random() * rotations.length)] * (Math.random() > 0.5 ? -1 : 1);

  // Sounds
  this.soundExplosion1 = this.game.add.audio('explosion-1');
  this.isAlive = true;

  //
  this.alpha = 0;

  this.isFading = false;

  // Events
  this.game.eventDispatcher.add(this.handleEvent, this);
  this.inputEnabled = true;
  this.events.onInputDown.add(function() {
    console.log('INPUT DOWN', this.x);
    this.game.eventDispatcher.dispatch({eventType: 'answered', asteroid: this});
    this.wasChosen = true;
  }, this);
};

Asteroid.prototype = Object.create(Phaser.Sprite.prototype);
Asteroid.prototype = Object.assign(Asteroid.prototype, {
  constructor: Asteroid,

  wasChosen: false,

  textObject: null,

  update: function () {
    this.body.gravity.y = this.settings.verticalSpeed;
    this.rotation += this.settings.rotationSpeed;
    this.textObject.rotation -= this.settings.rotationSpeed;

    if (this.isAlive && this.y > game.world.height - (20 * Utils.getGameScaleY())) {
      this.isAlive = false;
      this.game.eventDispatcher.dispatch({eventType: 'detonate', asteroid: this});
      // @todo Decide how to move on to the next question if the asteroids hit
      // the floor.
      //this.game.eventDispatcher.dispatch({eventType: 'scored', score: 0});
    }
  },

  /**
   *
   * @param text
   * @param isCorrect bool
   */
  setAnswer: function(text, isCorrect) {
    console.log(text);
    var asteroidTextWidth = (this.width * 1.3);
    var style = {
      align: 'center',
      fontSize: (4 * gameConfig.gameBaseFontSize),
      fill: 'rgba(255, 255, 255, 1)',
      wordWrap: true,
      wordWrapWidth: asteroidTextWidth,
//
//       backgroundColor: 'rgba(255, 115, 128, 0)',
//       stroke: 'rgba(255, 243, 244, 0.95)',
//       strokeThickness: 3,
    };
    this.textObject = new Phaser.Text(this.game, 0, (this.height * .5), text, style);
    this.textObject.anchor.set(0.5);
    //this.textObject.x = this.x;
    //this.textObject.y = this.y;
    this.addChild(this.textObject);



    this.isCorrect = isCorrect;
  },

  /**
   *
   * @param event
   */
  handleEvent: function(event) {
    // console.log('Asteroid event: ', event.eventType, this.x);

    switch(event.eventType) {
      case 'dropNow':
        var beginTween = this.game.add.tween(this)
          .to({alpha:1}, 1, Phaser.Easing.Linear.None).start();

        beginTween.onComplete.add(function() {
          this.settings.verticalSpeed =  50 + (Math.random() * 20);
        }, this);
        break;

      case 'answered':
        this.settings.verticalSpeed = 0;
        this.body.stop();
        break;

      case 'detonate':
        // burst of gold glitter
        if (this === event.asteroid) {
          this.explode();
          this.alpha = 0;
        } else {
          // fade out
          if (!this.isFading) {
            this.isFading = true;

            var tween = this.game.add.tween(this)
              .to({alpha: 0}, 1, Phaser.Easing.Linear.None, true);

            tween.onComplete.add(function () {
              this.game.eventDispatcher.dispatch({eventType: 'vaporized'});
              // when done with particles
              this.destroy();
            }, this);
          }
        }
        break;

      default: break;
    }
  },

  /**
   * Explosion animation
   */
  explode: function() {
    // Particle fx! Only correct answer explodes
    var emitter = game.add.emitter(0, 0, 100);

    emitter.makeParticles(['gold-1', 'gold-2', 'gold-3', 'gold-4'], undefined, 40);
    emitter.gravity = 300;

    emitter.x = this.x;
    emitter.y = this.y;

    //  The first parameter sets the effect to "explode" which means all particles are emitted at once
    //  The second gives each particle a 2000ms lifespan
    //  The third is ignored when using burst/explode mode
    //  The final parameter (10) is how many particles will be emitted in this single burst
    emitter.start(true, 4000, null, 50);

    this.soundExplosion1.play();
  },

  /**
   *
   */
  resize: function () {
    // @todo: update position when screen is resized
  },

  shutdown: function() {

  }
});

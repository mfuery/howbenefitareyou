var GameState = function (game) {

};

GameState.prototype = {

  /**
   * A random selection randomly ordered of 10 questions and answers from
   * QuestionData to be asked for the current round of gameplay.
   */
  questions: [],

  /**
   * Key of the current question being displayed.
   */
  currentQuestion: 0,

  /**
   * The total number of rounds per game.
   */
  totalQuestions: 5,

  /**
   * Numeric value storing the player's current score.
   */
  score: 0,

  /**
   * Text display object showing the current score.
   */
  scoreText: null,

  /**
   * Instances of the 3-5 asteroids shown on the screen.
   */
  asteroids: [],

  /**
   * Instances of the 3-5 cores shown on the screen.
   */
  cores: [],

  /**
   * Reference to the missile sprite instance.
   */
  missile: null,

  isScoring: false,

  /**
   * Sounds added to game.
   */
  sounds: {},

  /**
   * Creates new game round.
   *
   * @param questions
   * @param currentQuestion
   * @param totalQuestions
   * @param score
   */
  init: function(questions, currentQuestion, totalQuestions, score) {
    console.log('GAME STATE INIT *********');
    console.log('questions', questions);
    console.log('currentQuestion', currentQuestion);
    console.log('totalQuestions', totalQuestions);
    console.log('score', score);

    game.eventDispatcher.removeAll();

    this.questions = questions;
    if (questions === undefined) {
      this.questions = this.generateQuestions(10);
    }

    if (currentQuestion !== undefined) {
      this.currentQuestion = currentQuestion;
    }

    if (totalQuestions !== undefined) {
      this.totalQuestions = totalQuestions;
    }

    if (score !== undefined) {
      this.score = score;
    }

    if (this.currentQuestion >= this.totalQuestions) {
      this.showResults();
    }

    this.isScoring = false;
    this.asteroids = [];
    this.cores = [];
    this.missile = null;
    this.scoreText = null;
  },

  /**
   * Generates the display objects and data needed for the current state.
   */
  create: function () {
    this.background = new Background(game);
    this.ground = new Ground(game);
    this.missile = new Missile(game);

    this.scoreText = game.add.text(0, 0, 'SCORE: ' + this.score + "/" + this.totalQuestions,
      gameConfig.fontStyles.white);
    this.scoreText.anchor.x = 1;
    this.scoreText.anchor.y = 0 ;
    this.scoreText.x = game.world.width;
    this.scoreText.y = game.world.height - this.scoreText.height;

    this.questionText = game.add.text(game.world.centerX, 0, this.questions[this.currentQuestion].question, gameConfig.fontStyles.question);
    this.questionText.lineSpacing = -this.questionText.fontSize * .5;
    this.questionText.anchor.x = 0.5;

    var numAnswers = this.questions[this.currentQuestion].answers.length;
    var offsetX = ((game.world.width / numAnswers) / 2);
    for (var i = 0; i < numAnswers; i++) {
      this.asteroids.push(new Asteroid(game, {
        starty: this.questionText.bottom,
        startX: ((this.game.world.width / numAnswers) * i) + offsetX,
        textValue: this.questions[this.currentQuestion].answers[i].text,
        isCorrect: this.questions[this.currentQuestion].answers[i].score
      }));

      this.cores.push(new Core(game, this.asteroids[i]));
      this.asteroids[i].bringToTop();
    }

    game.eventDispatcher.add(this.handleEvent, this);

    // Countdown timer
    var countdownDuration = 4999;
    this.lastSecondsRemaining = countdownDuration;
    setTimeout(function() {
      this.game.eventDispatcher.dispatch({eventType: 'dropNow'});
    }.bind(this), countdownDuration);
    this.cdTimer = game.time.create();
    this.cdTimerEvent = this.cdTimer.add(countdownDuration, function() {
      this.cdTimer.stop();
    }.bind(this), this);
    this.cdTimer.start();
    this.cdText = this.game.add.text(this.game.world.centerX,
      this.game.world.centerY, '', gameConfig.fontStyles.countdown);
    this.cdText.alpha = 1;
    this.cdText.anchor.setTo(0.5);

    // Sounds
    this.sounds.beep = this.game.add.audio('beep-1');
    this.sounds.go = this.game.add.audio('go-1');

    // new Hint(this.game, this.game.world.centerX, this.game.world.centerY,
    //   'Fire at the asteroid with the correct answer');
  },

  /**
   * Event handler, duh
   * @param event object {eventType:<>, score:<>}
   */
  handleEvent: function(event) {

    // If 'scored' event from core, it means core animation done.
    switch(event.eventType) {
      case 'scored':
        console.log('GameState event: ' + event.eventType);
        if (this.isScoring) {
          return;
        }
        this.isScoring = true;
        this.updateScore(event.score);
    }
  },

  /**
   * Generates the random selection of 10 questions for the current round.
   */
  generateQuestions: function(num_questions) {
    var questions = game.cache.getJSON('questions');
    var shuffled = questions.slice(0);
    var i = questions.length;
    var min = i - num_questions;
    var temp;
    var index;

    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
  },

  /**
   * Move objects when canvas is resized.
   */
  resize: function() {
    console.log('resizing...');
  },

  /**
   * Update game objects on every frame.
   */
  update: function () {

  },

  /**
   * Updates the GameState.score property and updates the score entity
   */
  updateScore: function (score) {
    console.log('UPDATE SCORE');
    this.currentQuestion++;
    this.score += score;
    //this.game.state.clearCurrentState();
    this.game.state.start('game', true, false, this.questions, this.currentQuestion, this.totalQuestions, this.score);
    //this.game.state.restart(true, false, this.questions, this.currentQuestion, this.totalQuestions, this.score);
    //this.game.state.start('transfer', true, false, this.questions, this.currentQuestion, this.totalQuestions, this.score);
  },

  /**
   * Creates the MenuState and passes the player's final score.
   */
  showResults: function () {
    this.game.state.start('menu', true, false, this.score);
  },

  shutdown: function () {
    console.log('shutting down gamestate', this);
  },

  render: function() {
    if (this.cdTimer.running) {
      var secondsRemaining = Math.round((this.cdTimerEvent.delay - this.cdTimer.ms) / 1000);
      this.cdText.text = '' + secondsRemaining;
      if (secondsRemaining < 1) {
        this.cdText.text = 'GO!';
        this.sounds.go.play();
      } else if (this.lastSecondsRemaining != secondsRemaining) {
        this.sounds.beep.play();
      }
      this.lastSecondsRemaining = secondsRemaining;
    } else {
      this.cdText.alpha = 0;
    }
  }
};

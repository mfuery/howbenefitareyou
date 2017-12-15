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
  totalQuestions: 10,

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

    if (this.currentQuestion > this.totalQuestions) {
      this.showResults();
    }
  },

  /**
   * Generates the display objects and data needed for the current state.
   */
  create: function () {
    if (this.currentQuestion === 1) {
      //return;
    }
    this.background = new Background(game);
    this.ground = new Ground(game);
    this.missile = new Missile(game);

    this.scoreText = game.add.text(0, 0, 'SCORE: ' + this.score + "/" + this.totalQuestions, {
      font: '30px Courier',
      fill: '#fff',
      stroke: '#000',
      strokeThickness: 10
    });
    this.scoreText.anchor.x = 1;
    this.scoreText.x = game.world.width;

    var numAnswers = this.questions[this.currentQuestion].answers.length;
    var offsetX = ((game.world.width / numAnswers) / 2);
    for (var i = 0; i < numAnswers; i++) {
      this.asteroids.push(new Asteroid(game, {
        startX: ((this.game.world.width / numAnswers) * i) + offsetX,
        textValue: this.questions[this.currentQuestion].answers[i].text,
        isCorrect: this.questions[this.currentQuestion].answers[i].score
      }));

      this.cores.push(new Core(game, this.asteroids[i]));
      this.asteroids[i].bringToTop();
    }

    this.questionText = game.add.text(0, 0, this.questions[this.currentQuestion].question, {
      font: '30px Courier',
      fill: '#fff'
    });

    game.eventDispatcher.add(this.handleEvent, this);

    this.game.eventDispatcher.dispatch({eventType: 'dropNow'});


    this.score = 8;
//     this.showResults();
    // test answered event
    //game.eventDispatcher.dispatch({eventType: 'answered', asteroid: this.asteroids[0], state: this});

    // new Hint(this.game, this.game.world.centerX, this.game.world.centerY,
    //   'Fire at the asteroid with the correct answer');
  },

  /**
   * Event handler, duh
   * @param event object {eventType:<>, score:<>}
   */
  handleEvent: function(event) {
    console.log('GameState event: ' + event.eventType);

    // If 'scored' event from core, it means core animation done.
    switch(event.eventType) {
      case 'scored':
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
    this.currentQuestion++;
    this.score += score;
    this.game.state.clearCurrentState();
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
  }
};

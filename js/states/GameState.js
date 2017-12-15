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
  currentQuestion: -1,

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
   * Reference to the missile sprite instance.
   */
  missile: null,

  /**
   * Generates the display objects and data needed for the current state.
   */
  create: function () {
    this.background = new Background(game);
    this.ground = new Ground(game);
    this.questions = this.generateQuestions(10);1
    this.missile = new Missile(game);

    this.scoreText = game.add.text(0, 0, '', {
      font: '30px Courier',
      fill: '#fff',
      stroke: '#000',
      strokeThickness: 10
    });
    this.scoreText.anchor.x = 1;
    this.scoreText.x = game.world.width;
    this.updateScore(0);

    /* @todo:
    - Happens at State startup. Generates the random selection of questions for the current round.
    - Creates 5 asteroid entity instances to be reused throughout the round. (Places them offscreen to begin with)
    - Creates question entity to be reused throughout the round
    - Creates missile entity
    - Creates the score entity
    */
    for (var i = 0; i < this.game.difficulty; i++) {
      this.asteroids.push(new Asteroid(game, {
        startX: ((this.game.world.width / this.game.difficulty) * i) + 25
      }));
      // this.asteroids[i].
    }

    this.questionText = game.add.text(0, 0, 'something', {
      font: '30px Courier',
      fill: '#fff'
    });
    this.questions = this.generateQuestions(10);
    this.showNextQuestion();
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
    // @todo: Listen for player input and update and/or call functions as needed
    //updateScore();

  },

  /**
   * Goes to next index in Questions and performs logic related to displaying question and answer entities.
   */
  showNextQuestion: function () {
    this.currentQuestion++;

    if (this.currentQuestion > this.totalQuestions) {
      this.showResults();
    }

    var questionData = this.questions[this.currentQuestion];
    this.questionText.text = questionData.question;
    for (var i = 0; i <= questionData.answers.length ; i++) {
      //Asteroid.setAnswer(questionData.answers[i].text, questionData.answers[i].score);
    }
    /* @todo:
    - Goes to next index in Questions and performs logic related to displaying question and answer entities.
    - Places instanced asteroid entities evenly positioned apart based on number of total answers for the current question.
    - Updates text of asteroid entities to the current question answer
    - calls updateScore if selected answer was correct
    - calls showResults if no more questions in current round
    */
  },

  /**
   * Updates the GameState.score property and updates the score entity
   */
  updateScore: function (score) {
    this.score += score;
    this.scoreText.text = 'SCORE: ' + this.score + "/" + this.totalQuestions;
  },

  /**
   * Creates the ResultsState and passes the player's final score.
   */
  showResults: function () {
    this.game.state.start('results', true, false, this.score);
  }

};

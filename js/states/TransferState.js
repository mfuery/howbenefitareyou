var TransferState = function (game) {

};

TransferState.prototype = {

  init: function(questions, currentQuestion, totalQuestions, score) {
    console.log('TRANSFER STATE INIT *********');
    this.game.state.start('game', true, false, questions, currentQuestion, totalQuestions, score);
  },

  create: function () {
    // @todo: do resultsState create stuff here.
  }
};

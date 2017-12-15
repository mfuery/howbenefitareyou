/**
 *
 * @param game
 * @param x
 * @param y
 * @param text
 * @param style object
 * @param duration int in sec
 * @constructor
 */
function Hint(game, x, y, text, style, duration) {
  Phaser.Text.call(this, game, x, y, text, style || {});
  this.game = game;
  this.x = x;
  this.y = y;
  this.duration = duration || 5;
  this.alpha = 0;
  var fadeIn = this.game.add.tween(this).to({alpha: 0.8}, 1000, Phaser.Easing.Linear.None, true);
  fadeIn.onComplete.add(function(){
    this.game.time.events.add(Phaser.Timer.SECOND * this.duration, function() {
      this.game.add.tween(this).to({alpha: 0}, Phaser.Timer.SECOND * 3, Phaser.Easing.Linear.None, true);
    }, this);
  }, this);
}

Hint.prototype = Object.assign(Phaser.Text.prototype, {
  constructor: Hint,

  update: function() {}
});


function Utils() {

}

// @todo: Make this a property on game?
Utils.getGameScaleX = function () {
  return game.world.width / gameConfig.baseWidth;
};

Utils.getGameScaleY = function () {
  return game.world.height / gameConfig.baseHeight;
};

/*Utils.getGameScaleFull = function () {
  var scaleX = Utils.getGameScaleX();
  var scaleY = Utils.getGameScaleY();
  if (scaleX < scaleY) {
    return scaleX;
  }

  return scaleY;
};*/

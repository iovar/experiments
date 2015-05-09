var fmGame = function(canvas) {
  this.canvas = canvas;
  this.width = canvas.width;
  this.height = canvas.height;
  this.ctx = canvas.getContext('2d');
  this.ctx.clearRect(0, 0, this.width, this.height);
};

fmGame.prototype.draw = function() {
  this.ctx.fillStyle = 'red';
  this.ctx.fillRect(0, 0, this.width/2, this.height/2);
};


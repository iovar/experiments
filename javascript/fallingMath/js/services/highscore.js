(function() {
  angular.module('fallingMath')
    .service('highscore', function() {

      this.get = function(index) {
        if(index) {
          return (this.highscores.length >= index) ?
            this.highscores[index] : null;
        }
        else {
          return this.highscores;
        }
      };

      this.check = function(score) {
        for(var i=0; i<this.highscores.length; i++) {
          if(this.highscores[i].score < score) {
            return i;
          }
        }
        if(this.highscores.length < 10) {
          return this.highscores.length;
        }
        else {
          return -1;
        }
      };

      this.add = function(name, score) {
        var position = this.check(score);

        if(position >= 0) {
          this.highscores.splice(position,0, {
            name: name,
            score: score
          });
          if(this.highscores.length>10) {
            this.highscores = this.highscores.slice(0, 9);
          }
          this._save();
        }
      };

      this._save = function() {
        localStorage.setItem(
            'fallingMath-highscores',
            JSON.stringify(this.highscores)
          );
      };

      this._load = function() {
        this.highscores = JSON.parse(
            localStorage.getItem('fallingMath-highscores')
          ) || [] ;
      };

      //Initialize the service

      this._load();
    })
  ;
})();

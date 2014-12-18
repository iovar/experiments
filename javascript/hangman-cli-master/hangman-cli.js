var fs = require('fs');
var events = require('events');
var word = "";
var words_file = "words.dict";
var visible_word = "";
var incorrect = "";
var state = 'finished'; //newgame,finished

var hangman_frames = [
"                        \n" +
"                        \n" +
"                        \n" +
"                        \n" +
"                        \n" +
"                        \n" +
"          --------      \n" ,

"           ____         \n" +
"               |        \n" +
"               |        \n" +
"               |        \n" +
"               |        \n" +
"               |        \n" +
"          --------      \n" ,

"           ____         \n" +
"          |    |        \n" +
"          O    |        \n" +
"               |        \n" +
"               |        \n" +
"               |        \n" +
"          --------      \n" ,

"           ____         \n" +
"          |    |        \n" +
"          O    |        \n" +
"         /|\\   |        \n" +
"               |        \n" +
"               |        \n" +
"          --------      \n" ,

"           ____         \n" +
"          |    |        \n" +
"          O    |        \n" +
"         /|\\   |        \n" +
"         / \\   |        \n" +
"               |        \n" +
"          --------      \n" ,


];


var clearScreen = function() {
  var i, ns = '';

  for(i = 0; i < process.stdout.rows; i++) {
    ns+='\n';
  }
  console.log(ns);
};

var draw = function() {
  console.log(hangman_frames[incorrect.length]);
  console.log('Incorrect letters entered: '+incorrect+'\n');
  console.log(visible_word+'\n');
  if(state === 'finished') {
    if(word.length >0 ) {
      console.log('Word was: '+word+'\n');
    }
    console.log('Welcome to hangman js!\n Press enter to begin.');
  }
};

var loadWord = function() {
  var words,words_array;

  try {
    words = fs.readFileSync(words_file, 'utf8');
  }
  catch (exc) {
    console.log('Error opening file "'+words_file+'".\nAborting.');
    process.exit();
  }
  words_array = words.split('\n');
  
  word = words_array[Math.floor(Math.random() * (words_array.length - 1))]; 
  visible_word = word.replace(/[a-zA-Z]/g,'_');

};

var reset = function() {
  loadWord();
  incorrect='';
  state = 'newgame';
};

var checkState = function(letter) {
  var word_l=word.toLowerCase();
  var letter_l = letter.toLowerCase();
  var missing = 0;
  var next_visible="";

  if(word_l.indexOf(letter_l)>=0) {
    var hits=[word_l.indexOf(letter_l)];
    while(word_l.indexOf(letter_l,hits[hits.length-1]+1)>=0) {
      hits.push(word_l.indexOf(letter_l,hits[hits.length-1]+1));
    }
    for(var i=0; i< word.length; i++) {
      if(hits.indexOf(i)>=0) {
        next_visible+=word[i];
      }
      else {
        next_visible+=visible_word[i];
        if(visible_word[i] === '_') {
          missing++;
        }
      }
    }
    visible_word = next_visible;
    if(missing === 0) {
      state = 'finished';
    }
  }
  else if(incorrect.toLowerCase().indexOf(letter.toLowerCase()) < 0) {
    incorrect+=letter.toUpperCase();
    if(incorrect.length >= 4) {
      state = 'finished';
    }
  }
};

var loop = function(data) {
  if(state === 'finished' && data) {
    console.log('reseting!');
    reset();
  }
  if(data && data !=='\n') { 
    checkState(data.slice(0,1));
  }
  clearScreen();
  draw();
  if(state !== 'finished') {
    console.log('Enter a letter:');
  }
};

process.stdin.setEncoding('utf8');
process.stdin.on('data', loop);
process.stdin.resume();
loop();

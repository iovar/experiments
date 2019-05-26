import { Injectable, EventEmitter } from '@angular/core';

export enum GameState {
  PLAYING,
  STOPPED
}

const MIN_SHUFFLE = 15;
const MAX_SHUFFLE = 20;

@Injectable()
export class GameEngineService {
  state: GameState = GameState.STOPPED;
  stateChange: EventEmitter<GameState> = new EventEmitter();
  positionChange: EventEmitter<any> = new EventEmitter();
  matrix: number[] = [];
  previousEmpty: number = 8;

  constructor() {
    this.reset();
  }

  reset() {
    // pieces count is 1-based, same to the numbers they display
    for (let i=0; i<8; i++) {
      this.matrix[i] = i + 1;
    }

    this.matrix[8] = -1;
    this.positionChange.emit(this.matrix);
  }

  startGame() {
    this.shuffle();
    this.state = GameState.PLAYING;
    this.stateChange.emit(this.state);
  }

  endGame() {
    this.reset();
    this.state = GameState.STOPPED;
    this.stateChange.emit(this.state);
  }

  shuffle() {
    let reps = Math.floor(Math.random() * (MAX_SHUFFLE - MIN_SHUFFLE + 1))
      + MIN_SHUFFLE,
        maxReps = reps * 10;

    let timer = setInterval(() => {
      let index = Math.floor(Math.random() * 9);

      while (!this.shift(index, true) && maxReps > 0) {
        index = Math.floor(Math.random() * 9);
        maxReps--;
      }
      reps--;

      if (reps <=0 || maxReps <=0) {
        clearInterval(timer);
        this.positionChange.emit(this.matrix);
      }
    }, 500);
  }

  shift(index: number, shifting?: boolean): boolean {
    let emptyIndex = this.matrix.indexOf(-1),
        eCol = emptyIndex % 3,
        eLine = Math.floor(emptyIndex / 3),
        col = index % 3,
        line = Math.floor(index / 3);

    if ((eCol === col && eLine === line) ||
        (shifting && index === this.previousEmpty)) {
      return false;
    }

    if (eCol === col) {
      if (eLine === line - 1) {
        this.moveTo(index, index - 3);
      } else if (eLine === line - 2) {
        this.moveTo(index - 3, index - 6);
        this.moveTo(index, index - 3);
      } else if (eLine === line + 1) {
        this.moveTo(index, index + 3);
      } else if (eLine === line + 2) {
        this.moveTo(index + 3, index + 6);
        this.moveTo(index, index + 3);
      }
    } else if (eLine === line) {
      if (eCol === col - 1) {
        this.moveTo(index, index - 1);
      } else if (eCol === col - 2) {
        this.moveTo(index - 1, index - 2);
        this.moveTo(index, index - 1);
      } else if (eCol === col + 1) {
        this.moveTo(index, index + 1);
      } else if (eCol === col + 2) {
        this.moveTo(index + 1, index + 2);
        this.moveTo(index, index + 1);
      }
    }

    if (eCol === col  || eLine === line) {
      this.positionChange.emit(this.matrix);

      if (shifting === true) {
        this.previousEmpty = emptyIndex;
      } else if (index === 8 && this._inStartPosition()) {
        this.endGame();
      }
      return true;
    }

    return false;
  }

  moveTo(oldIndex, newIndex) {
    this.matrix[newIndex] = this.matrix[oldIndex];
    this.matrix[oldIndex] = -1;
  }

  _inStartPosition(): boolean {
    for (let i=0; i<8; i++) {
      if (this.matrix[i] !== i + 1) {
        return false
      }
    }

    return true;
  }

}

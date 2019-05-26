import { Component, OnDestroy } from '@angular/core';
import { GameState, GameEngineService } from  './game-engine.service';

enum TitleMode {
    flash,
    scroll,
    wait
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title: string = 'J8Pieces!';
  private titleHidden: boolean = false;
  private interval: number;
  private repeatCount: number = 0;
  private mode: TitleMode;
  private GameState = GameState;

  constructor(private engine: GameEngineService) {
    this.mode = TitleMode.flash;
    this.GameState = GameState;
    this.titleScroll();
    this.engine.positionChange.subscribe((matrix) => {
      console.log(`Matrix is ${matrix}`);
    });
  }

  startGame() {
    this.engine.startGame();
  }

  endGame() {
    this.engine.endGame();
  }

  titleScroll() {
    this.interval = setInterval(() => {
      if (this.repeatCount < this.title.length * 3) {
        this.applyModeEffect();
        this.repeatCount++;
      } else {
        this.repeatCount = 0;
        this.rotateMode();
      }
    }, 400);
  }

  private applyModeEffect() {
    switch(this.mode) {
      case TitleMode.flash:
        this.title = this.title.slice(1) + this.title[0];
        break;
      case TitleMode.scroll:
        this.titleHidden = !this.titleHidden;
        break;
    }
  }

  private rotateMode() {
    switch(this.mode) {
      case TitleMode.flash:
        this.mode = TitleMode.scroll;
        break;
      case TitleMode.scroll:
        this.mode = TitleMode.wait;
        this.titleHidden = false;
        break;
      default:
        this.mode = TitleMode.flash;
    }
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

}

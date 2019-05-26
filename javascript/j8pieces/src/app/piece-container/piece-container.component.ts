import { Component, OnInit } from '@angular/core';
import { GameState, GameEngineService } from  '../game-engine.service';

@Component({
  selector: 'app-piece-container',
  templateUrl: './piece-container.component.html',
  styleUrls: ['./piece-container.component.css']
})
export class PieceContainerComponent implements OnInit {
  GameState = GameState;

  constructor(private engine: GameEngineService) {
  }

  ngOnInit() {
  }

  getPosition(num: number): number {
    return this.engine.matrix.indexOf(num);
  }

  pieceClicked(num:number) {
    if (this.engine.state === GameState.PLAYING) {
      this.engine.shift(this.getPosition(num));
    }
  }
}

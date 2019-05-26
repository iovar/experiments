import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PieceContainerComponent } from './piece-container/piece-container.component';
import { PieceComponent } from './piece/piece.component';

import { GameEngineService } from  './game-engine.service';
import { NumberRangePipe } from './number-range.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PieceContainerComponent,
    PieceComponent,
    NumberRangePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [GameEngineService],
  bootstrap: [AppComponent]
})
export class AppModule { }

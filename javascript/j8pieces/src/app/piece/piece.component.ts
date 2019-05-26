import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.css']
})
export class PieceComponent implements OnInit {
  @Input() position: number;
  left: string;
  top: string;

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes) {
    if (changes.position) {
      this.setPosition(this.position);
    }
  }

  setPosition(pos) {
    if (pos < 3) {
      this.top = '0';
    } else if (pos < 6) {
      this.top = '90px';
    } else {
      this.top = '180px';
    }

    let col = (pos +1) % 3;

    if (col === 1) {
      this.left = '0';
    } else if (col === 2) {
      this.left = '90px';
    } else {
      this.left = '180px';
    }

  }

}

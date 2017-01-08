import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-fixture',
  templateUrl: './fixture.component.html',
  styleUrls: ['./fixture.component.css']
})
export class FixtureComponent implements OnInit {
  @Input() opponent;
  @Input() date;

  constructor() { }

  ngOnInit() {
  }

}

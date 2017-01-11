import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-fixture',
  templateUrl: './fixture.component.html',
  styleUrls: ['./fixture.component.css']
})
export class FixtureComponent implements OnInit {
  @Input() fixture;
 
  @Output() yes = new EventEmitter();
  @Output() no = new EventEmitter();

  availability;

  constructor() { }

  ngOnInit() {
  }

  setAvailability(isAvailible){
    if(parseInt(isAvailible.value)){
      this.yes.emit();
    }
    else{
      this.no.emit();
    }
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chmurka',
  templateUrl: './chmurka.component.html',
  styleUrls: ['./chmurka.component.less']
})
export class ChmurkaComponent implements OnInit {

  constructor() { }

  down = false;

  click()
  {
    this.down = true;
  }

  ngOnInit() {
  }

}

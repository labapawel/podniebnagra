import { EngineService } from './engine.service';
import { Component, OnInit } from '@angular/core';
import { element } from '@angular/core/src/render3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  score = 0;
  time = new Date();
  element = [];

  x = 0;
  czyNieGramy = false;

  constructor(private engine: EngineService) {



    setInterval((ts) => {
      if(this.engine.czyGramy)
      {
        this.element.push(new Date());
        let dx = new Date().setSeconds(-20);
        this.element = this.element.filter(e => e > dx );
      }
    }, 1000);   }


}

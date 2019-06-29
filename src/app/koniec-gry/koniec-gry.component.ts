import { EngineService } from './../engine.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-koniec-gry',
  templateUrl: './koniec-gry.component.html',
  styleUrls: ['./koniec-gry.component.less']
})
export class KoniecGryComponent implements OnInit {

  koniecGry = false;
  constructor(private engine: EngineService) {

    this.engine.endGame.asObservable().subscribe(e => {
      if (e !== false) {
        this.koniecGry = true;
      } else {
        this.koniecGry = false;
      }
    });

   }




  ngOnInit() {
  }

}

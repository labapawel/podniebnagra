import { EngineService } from "./engine.service";
import { Component, OnInit } from "@angular/core";
import { element } from "@angular/core/src/render3";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.less"]
})
export class AppComponent {
  score = 0;
  time = new Date();
  element = [];

  x = 0;
  czyNieGramy = false;
  koniecGry = false;

  constructor(private engine: EngineService) {


    this.engine.endGame.asObservable().subscribe(e => {
      if (e !== false) {
        this.koniecGry = true;
      } else {
        this.koniecGry = false;
      }
    });

    setInterval(ts => {
      if (this.engine.czyGramy) {
        this.element.push(new Date().getTime() + 20000);
        let dx = new Date().getTime();
        let testElemenow = this.element.filter(e => e < dx);
        this.engine.CheckClick(testElemenow);
        this.engine.czasGryWylicz();
        this.element = this.element.filter(e => e > dx);
      }
    }, 1000);
  }
}

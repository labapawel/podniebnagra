import { EngineService } from "./../engine.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-start-gry",
  templateUrl: "./start-gry.component.html",
  styleUrls: ["./start-gry.component.less"]
})
export class StartGryComponent implements OnInit {
  czyNieGramy = false;
  nickname: string;

  constructor(private engine: EngineService) {
    this.engine.isGame.asObservable().subscribe(e => {
      console.log("----start gry ------" + e);
      this.czyNieGramy = e;
    });
  }

  startGry() {
    console.log("----start gry1 ------");
    if (this.nickname.trim() != "") {
      this.engine.startGry(this.nickname);
    }
  }

  ngOnInit() {}
}

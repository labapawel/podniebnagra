import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { ChmurkaComponent } from "./chmurka/chmurka.component";
import { BehaviorSubject } from "rxjs";
import * as moment from 'moment';
import { ReturnStatement } from '@angular/compiler';


@Injectable({
  providedIn: "root"
})
export class EngineService {
  lists: Array<ChmurkaComponent> = [];
  score = new BehaviorSubject<number>(0);
  czyGramy: boolean = false;
  czyKonczymy = false;
  czasGry = 20; // 120 sekund
  czasStartu: Date;

  isGame = new BehaviorSubject<boolean>(this.czyGramy);


  private _score = 0;
  constructor(private sendScore: HttpClient) {}

  czyKoniec()
  {
    this.czyKonczymy = moment(this.czasStartu).diff(new Date(), 'second') <= 0;
    if(this.czyKonczymy && this.czyGramy)
      {
        this.czyGramy = false;
      }
    return this.czyGramy && this.czyKonczymy;
  }

  startGry(nickname)
  {
    if(nickname.trim() == "" )
      return;

    localStorage.setItem('nickname', nickname);

    this.czyGramy = true;
    this.czasStartu = moment().add(this.czasGry, 'seconds').toDate();
    this.isGame.next(this.czyGramy);

  }

  public CheckClick(idItems)
  {
    console.log(idItems);
    idItems.forEach(element => {
      let elems = this.lists.filter(e => e.uid == element);
      if(elems.length > 0)
      {
        elems.forEach(x => {
          this._score -= x.addScore;
        })
      }

    });


    this.score.next(this._score);
  }

  public Click(item: ChmurkaComponent) {
    if (this.lists.filter(e => e === item).length == 1) {
      this._score += item.addScore;
      this.score.next(this._score);
      this.lists = this.lists.filter(e => e != item);
    }
  }

  public koniecGry()
  {

  }

  public czasGryWylicz()
  {
    this.czyGramy = moment(this.czasStartu).diff(new Date(), 'second') > 0;
    if(!this.czyGramy)
    {
      this.sendScore.post('http://score.wsi.edu.pl/scores',
      {alias: localStorage.getItem('nickname'), score: this._score}).subscribe(
        e => {}
      );
    }
  //  this.isGame.next(this.czyGramy);
  }


  public addItem(item: ChmurkaComponent) {
    this.lists.push(item);
  }

  scoreSubs() {
    return this.score.asObservable();
  }
}

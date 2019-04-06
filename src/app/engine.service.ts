import { Injectable } from '@angular/core';
import { ChmurkaComponent } from './chmurka/chmurka.component';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EngineService {

  lists: Array<ChmurkaComponent> = [];
  score = new BehaviorSubject<number>(0);
  private _score = 0;
  constructor() { }

  public Click(item:ChmurkaComponent)
  {
    if(this.lists.filter(e => e === item).length == 1)
          this.score.next(++this._score);
    this.lists = this.lists.filter(e => e != item);
  }

  public addItem(item:ChmurkaComponent)
  {
    this.lists.push(item);
  }


  scoreSubs()
  {
    return this.score.asObservable();
  }

}

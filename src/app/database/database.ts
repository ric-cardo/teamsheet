import { Observable } from 'rxjs/Rx';

export interface DBAdapter{
  all(path):Observable<any>;
  insert(data);
  update(id,data);
  remove(id);
}

export class Database implements DBAdapter{
  fixtures;

  insert(data){}

  all(path){
    return Observable.of(this.fixtures);
  }

  update(id,data){};
  remove(id){};
}
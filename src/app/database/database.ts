import { Observable } from 'rxjs/Rx';

export interface DBAdapter{
  all(path,query):Observable<any>;
  insert(data);
  update(id,data);
  remove(id);
  instance();
}

export class Database implements DBAdapter{
  fixtures;

  insert(data){}

  all(path,query){
    return Observable.of(this.fixtures);
  }

  update(id,data){};
  remove(id){};
  instance() :any{
    return {};
  };
}
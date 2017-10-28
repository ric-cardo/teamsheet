import { Observable } from 'rxjs/Rx';

export interface DBAdapter{
  all(key,query?):Observable<any>;
  insert(key,data);
  update(key,id,data);
  remove(key,id);
  instance();
}

export class Database implements DBAdapter{

  insert(key,data){}

  all(key,query?){
    return Observable.of();
  }

  update(key,id,data){};
  remove(key){};
  instance() :any{
    return {};
  };
}
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class RestService {

  url: string = "http://kreaswiss.tk/openbravo/org.openbravo.service.json.jsonrest/";
  headers = new Headers({ 'Authorization': 'Basic ' + btoa('Edwin:EdwinTest') });

  constructor(private http: Http) {  }

  getAll (entity: string, options:string) {
    return this.http.get( this.url + entity + options, { headers: this.headers } )
      .map( response => response.json() );
  }

  getSingle (entity: string, id:string) {
    return this.http.get( this.url + entity + "/" + id, { headers: this.headers } )
      .map( response => response.json() );
  }

  add ( obj: any): Promise<any> {
    let body = JSON.stringify(obj);

    return this.http.post( this.url, body, { headers: this.headers } )
      .toPromise()
      .then(response => response.json())
      .catch(error => console.error(error));
  }

  delete (entity:string, id: string) {
    return this.http.delete(this.url + entity + "/" + id)
      .map( response => response.json() );
  }

}

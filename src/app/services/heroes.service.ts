import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';

import { Heroe } from '../interfaces/heroe.interface';

@Injectable()
export class HeroesService {

  heroesURL: string = "https://heroesapp-eeb63.firebaseio.com/heroes.json";
  heroeURL: string = "https://heroesapp-eeb63.firebaseio.com/heroes/";


  constructor( private http: Http) { }

  nuevoHeroe( heroe: Heroe) {
    let body = JSON.stringify(heroe);
    let headers = new Headers({ 'Content-Type':'application/json' });

    return this.http.post( this.heroesURL, body, { headers: headers } )
      .map( response => {
        console.log(response.json());
        return response.json();
      } )
  }

  actualizarHeroe( heroe: Heroe, key$: string) {
    let body = JSON.stringify(heroe);
    let headers = new Headers({ 'Content-Type':'application/json' });

    // https://heroesapp-eeb63.firebaseio.com/heroes/-L5V7bWClwCUFZHmvylF
    let url = `${ this.heroeURL }${key$}.json`

    return this.http.put( url, body, { headers: headers } )
      .map( response => {
        console.log(response.json());
        return response.json();
      } )
  }

  getHeroe(key$: string) {
    let url = `${ this.heroeURL }${key$}.json`;
    return this.http.get( url )
      .map( response => response.json() );
  }

  getHeroes() {
    return this.http.get( this.heroesURL )
      .map( response => response.json() );
  }

  borrarHeroe(key$: string) {
    let url = `${ this.heroeURL }${key$}.json`;
    return this.http.delete(url)
      .map( response => response.json() );
  }
}

import { Component, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: []
})
export class HeroesComponent implements OnInit {

  heroes: Heroe[] = [];
  loading: boolean = true;

  constructor(private _heroesService: HeroesService) {

    this._heroesService.getHeroes()
      .subscribe( data => {

        // this.loading = false;
        setTimeout( () => {
          this.heroes = data;
          this.loading = false;
        }, 5000)
      } )

  }

  ngOnInit() {
  }

  borrarHeroe(key$: string) {
    this._heroesService.borrarHeroe(key$)
      .subscribe( data => {
        if(data) {
          console.error(data);
        }else {
          // todo bien actualice la pantalla
          delete this.heroes[key$];
        }
      });
  }
}

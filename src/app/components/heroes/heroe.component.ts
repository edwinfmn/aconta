import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: []
})
export class HeroeComponent implements OnInit {

  private heroe: Heroe = {
    nombre: "",
    bio: "",
    casa: "Marvel"
  }

  nuevo: boolean = false;
  id: string;

  constructor( private _heroesService: HeroesService,
               private _router: Router,
               private _activatedRoute: ActivatedRoute) {
   this._activatedRoute.params
     .subscribe( param => {

       this.id = param['id'];

       if(this.id === 'nuevo'){
         this.nuevo = true;
       } else {
         this.nuevo = false;
         this._heroesService.getHeroe( this.id )
            .subscribe( data => this.heroe = data );
       }
     } );
 }

  ngOnInit() {
  }

  guardar() {
    console.log(this.heroe);

    if(this.nuevo) {
      this._heroesService.nuevoHeroe( this.heroe )
        .subscribe( data => {
            console.log('created data', data.name);
            this._router.navigate(['/hero', data.name]);
          },
          error => console.error(error)
        );
    } else {
      this._heroesService.actualizarHeroe( this.heroe, this.id )
        .subscribe( data => {
            console.log('updated data', data);
          },
          error => console.error(error)
        );
    }
  }

  agregarNuevo(forma: NgForm) {

    this._router.navigate(['/hero', 'nuevo']);
    forma.reset({
      casa: "Marvel"
    });

  }

}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter'; //importing the module
import { OrderModule } from 'ngx-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSelectModule } from 'ngx-select-ex';

import { APP_ROUTING } from './app.routes';

// servicios
import { HeroesService } from './services/heroes.service';
import { RestService } from './services/rest.service';

// pipes
import { KeysPipe } from './pipes/keys.pipe';

import { AppComponent } from './app.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { HeroeComponent } from './components/heroes/heroe.component';
import { RestComponent } from './components/rest.component';


@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroeComponent,
    KeysPipe,
    RestComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    APP_ROUTING,
    Ng2SearchPipeModule,
    OrderModule,
    NgxPaginationModule,
    NgxSelectModule
  ],
  providers: [
    HeroesService,
    RestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

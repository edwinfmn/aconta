import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './components/heroes/heroes.component';
import { HeroeComponent } from './components/heroes/heroe.component';
import { RestComponent } from './components/rest.component';

const APP_ROUTES: Routes = [
  { path: 'heroes', component: HeroesComponent },
  { path: 'hero/:id', component: HeroeComponent },
  { path: 'rest', component: RestComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'rest' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);

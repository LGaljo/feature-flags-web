// tslint:disable:max-line-length

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ErrorComponent} from './components/error/error.component';
import {ApplicationsComponent} from './components/applications/applications.component';
import {FrontPageComponent} from './components/front-page/front-page.component';
import {ApplicationDetailsComponent} from './components/applications/details/application-details.component';

const routes: Routes = [
  {path: '', component: FrontPageComponent},
  {path: 'applications', component: ApplicationsComponent},
  {path: 'applications/:id', component: ApplicationDetailsComponent},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

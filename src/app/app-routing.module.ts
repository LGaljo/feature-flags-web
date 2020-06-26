// tslint:disable:max-line-length

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ErrorComponent} from './components/error/error.component';
import {ApplicationsComponent} from './components/applications/applications.component';
import {FrontPageComponent} from './components/front-page/front-page.component';
import {ApplicationDetailsComponent} from './components/applications/details/application-details.component';
import {FlagsDetailsComponent} from './components/flags/details/flags-details.component';
import {CreateRuleComponent} from './components/rules/create-rule/create-rule.component';

const routes: Routes = [
  {path: '', component: FrontPageComponent},
  {path: 'applications', component: ApplicationsComponent},
  {path: 'applications/:id', component: ApplicationDetailsComponent},
  {path: 'applications/:aid/flags/:fid', component: FlagsDetailsComponent},
  {path: 'applications/:aid/rule', component: CreateRuleComponent},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

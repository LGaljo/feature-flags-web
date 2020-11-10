import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './components/app/app.component';
import {ErrorComponent} from './components/error/error.component';
import {ApplicationsComponent} from './components/applications/applications.component';
import {AppRoutingModule} from './app-routing.module';
import {FrontPageComponent} from './components/front-page/front-page.component';
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {environment} from '../environments/environment';
import {HttpClientModule} from '@angular/common/http';
import {ApplicationDetailsComponent} from './components/applications/details/application-details.component';
import {DialogYesnoComponent} from './components/dialog-yesno/dialog-yesno.component';
import {MatDialogModule} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {PortalModule} from '@angular/cdk/portal';
import {MatTreeModule} from '@angular/material/tree';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatStepperModule} from '@angular/material/stepper';
import {MatChipsModule} from '@angular/material/chips';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatBadgeModule} from '@angular/material/badge';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {CdkTreeModule} from '@angular/cdk/tree';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {A11yModule} from '@angular/cdk/a11y';
import { FlagsDetailsComponent } from './components/flags/details/flags-details.component';
import { CreateRuleComponent } from './components/rules/create-rule/create-rule.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CreateFlagComponent } from './components/flags/create-flag/create-flag.component';
import { InfoPageComponent } from './components/info-page/info-page.component';
import {CreateAppComponent} from './components/applications/create-app/create-app.component';
import { AdminComponent } from './components/admin/admin.component';
import { DetailsRolloutComponent } from './components/rules/details-rollout/details-rollout.component';
import { CreateSAERuleComponent } from './components/rules/create-rule/create-sae-rule/create-sae-rule.component';
import { CreateABTRuleComponent } from './components/rules/create-rule/create-abt-rule/create-abt-rule.component';
import { CreateJFORuleComponent } from './components/rules/create-rule/create-jfo-rule/create-jfo-rule.component';
import { CreateGRORuleComponent } from './components/rules/create-rule/create-gro-rule/create-gro-rule.component';

@NgModule({
  declarations: [
    AppComponent,
    ApplicationsComponent,
    ErrorComponent,
    FrontPageComponent,
    ToolbarComponent,
    ApplicationDetailsComponent,
    DialogYesnoComponent,
    FlagsDetailsComponent,
    CreateRuleComponent,
    CreateFlagComponent,
    InfoPageComponent,
    CreateAppComponent,
    AdminComponent,
    DetailsRolloutComponent,
    CreateSAERuleComponent,
    CreateABTRuleComponent,
    CreateJFORuleComponent,
    CreateGRORuleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    FormsModule,

    A11yModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    PortalModule,
    ScrollingModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [
    {
      provide: 'title', useValue: environment.title
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

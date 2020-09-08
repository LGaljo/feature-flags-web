import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Application} from '../../../models/Application';
import {AppsService} from '../../../services/apps.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {FlagDto} from '../../../models/FlagDto';
import {MatDialog} from '@angular/material/dialog';
import {DialogYesnoComponent} from '../../dialog-yesno/dialog-yesno.component';
import {FlagsService} from '../../../services/flags.service';

@Component({
  selector: 'app-details',
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.css']
})
export class ApplicationDetailsComponent implements OnInit, OnDestroy {

  @Input() app: Application;
  flags: FlagDto[];

  private subscriptions: Subscription[] = [];

  constructor(
    private appsService: AppsService,
    private flagsService: FlagsService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.subscriptions.push(this.route.params.subscribe(params => {
      this.app = new Application();
      this.app.id = params.id;
    }));
    this.getData();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(value => value.unsubscribe());
  }

  getData() {
    if (this.app && this.app.id) {
      this.subscriptions.push(this.appsService.get(this.app.id).subscribe(
        (val: Application) => {
          this.app = val;
        },
        error => {
          console.log(error);
        }
      ));
    }

    this.subscriptions.push(this.flagsService.getFlags(this.app.id).subscribe(
      (val: FlagDto[]) => {
        this.flags = val;
      },
      error => {
        console.log(error);
      }
    ));
  }

  removeFlagDialog(flag: FlagDto) {
    const dialogRef = this.dialog.open(DialogYesnoComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // TODO remove flag
      }
    });
  }

  removeAppDialog() {
    const dialogRef = this.dialog.open(DialogYesnoComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.subscriptions.push(this.appsService.removeApp(this.app.id).subscribe(rs => {
          console.log(rs);
        }));
        this.router.navigate(['/applications']);
      }
    });
  }

  createRule(flag: FlagDto) {
    this.router.navigate([
        '/applications/' + this.app.id + '/rule/' + flag.id],
      {
        state: {
          app: this.app,
          flag
        }
      });
  }

  addFlag() {
    this.router.navigate([
        '/applications/' + this.app.id + '/flag'],
      {
        state: {
          app: this.app
        }
      });
  }
}

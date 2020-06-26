import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Application} from '../../../models/Application';
import {AppsService} from '../../../services/apps.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {FlagDto} from '../../../models/FlagDto';
import {MatDialog} from '@angular/material/dialog';
import {DialogYesnoComponent} from '../../dialog-yesno/dialog-yesno.component';

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
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

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

    this.subscriptions.push(this.appsService.getFlags(this.app.id).subscribe(
      (val: FlagDto[]) => {
        this.flags = val;
      },
      error => {
        console.log(error);
      }
    ));
  }

  openDetails(flag: FlagDto) {
    console.log('Done sth');
    this.dialog.open(DialogYesnoComponent, {
      width: '400px'
    });
  }
}

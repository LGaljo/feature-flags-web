import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AppsService} from '../../services/apps.service';
import {Router} from '@angular/router';
import {AppDto} from '../../models/dtos/AppDto';
import {FlagDto} from '../../models/dtos/FlagDto';
import {FlagsService} from '../../services/flags.service';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit, OnDestroy {

  apps: AppDto[] = [];

  private subscriptions: Subscription[] = [];

  constructor(
    private appsService: AppsService,
    private flagsService: FlagsService,
    private router: Router
) { }

  ngOnInit(): void {
    this.subscriptions.push(this.appsService.getAll().subscribe(
      (val: AppDto[]) => {
        this.apps = val;
        this.getFlagInfo();
      },
      error => {
        console.log(error);
      }
    ));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(value => value.unsubscribe());
  }

  getFlagInfo() {
    for (const app of this.apps) {
      this.subscriptions.push(this.flagsService.getFlags(app.id).subscribe(
        (val: FlagDto[]) => {
          val.forEach((flag) => {
            console.log(Date.parse(flag.expirationDate.toString()), Date.now());
            if (Date.parse(flag.expirationDate.toString()) < Date.now()) {
              app.hasExpiredFlags = true;
            }
          });
        },
        error => {
          console.log(error);
        }
      ));
    }
  }
}

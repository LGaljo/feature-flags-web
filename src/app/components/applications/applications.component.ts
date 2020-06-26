import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AppsService} from '../../services/apps.service';
import {Application} from '../../models/Application';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit, OnDestroy {

  apps: Application[] = [];

  private subscriptions: Subscription[] = [];

  constructor(
    private appsService: AppsService
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(this.appsService.getAll().subscribe(
      (val) => {
        this.apps = val;
      },
      error => {
        console.log(error);
      }
    ));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(value => value.unsubscribe());
  }
}

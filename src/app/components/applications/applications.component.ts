import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AppsService} from '../../services/apps.service';
import {Router} from '@angular/router';
import {AppDto} from '../../models/dtos/AppDto';

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
    private router: Router
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

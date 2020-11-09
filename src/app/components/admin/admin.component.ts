import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Application} from '../../models/Application';
import {AdminService} from '../../services/admin.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {
  step = 0;
  hidden = true;
  private subscriptions: Subscription[] = [];

  constructor(
    private adminService: AdminService,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
  }

  seedData() {
    this.subscriptions.push(this.adminService.seedDatabase().subscribe(
      (val: any) => {
        this.snackBar.open('Successfully seeded.', '', {duration: 1500});
      },
      error => {
        console.log(error);
        this.snackBar.open('Request failed. Check console.');
      }
    ));
  }

  clearDatabase() {
    this.hidden = false;

    this.step += 1;
    if (this.step === 5) {
      this.subscriptions.push(this.adminService.clearDatabase().subscribe(
        (val: any) => {
          this.snackBar.open('DB successfully cleared.', '', {duration: 1500});
          this.hidden = true;
          this.step = 0;
        },
        error => {
          console.log(error);
          this.snackBar.open('Request failed. Check console.');
        }
      ));
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(value => value.unsubscribe());
  }
}

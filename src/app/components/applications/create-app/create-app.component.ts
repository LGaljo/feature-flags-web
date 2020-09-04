import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppsService} from '../../../services/apps.service';
import {Subscription} from 'rxjs';
import {EndUser} from '../../../models/EndUser';
import {Router} from '@angular/router';
import {Application} from '../../../models/Application';

@Component({
  selector: 'app-create-app',
  templateUrl: './create-app.component.html',
  styleUrls: ['./create-app.component.css']
})
export class CreateAppComponent implements OnInit {

  form: FormGroup;
  private subscriptions: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private appsService: AppsService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.form.valid) {
      this.subscriptions.push(this.appsService.create(this.form.value.name).subscribe(
        (val: Application) => {
          if (val) {
            this.router.navigate(['/applications/' + val.id]);
          }
        },
        error => {
          console.log(error);
        }
      ));
    }
  }
}

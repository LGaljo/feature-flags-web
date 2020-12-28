import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataType, FlagDto} from '../../../models/dtos/FlagDto';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {FlagsService} from '../../../services/flags.service';
import {AppsService} from '../../../services/apps.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSelectChange} from '@angular/material/select';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ExceptionDto} from '../../../models/dtos/ExceptionDto';

@Component({
  selector: 'app-create-flag',
  templateUrl: './create-flag.component.html',
  styleUrls: ['./create-flag.component.css']
})
export class CreateFlagComponent implements OnInit, OnDestroy {

  appId: number;
  form: FormGroup;

  flagType: DataType = DataType.BOOL;
  flag: FlagDto;

  private subscriptions: Subscription[] = [];

  constructor(
    private appsService: AppsService,
    private flagsService: FlagsService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    this.flag = new FlagDto();
  }

  ngOnInit(): void {
    this.getData();
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      dataType: ['', Validators.required],
      defaultValue: ['', Validators.required],
      expirationDate: ['', Validators.required]
    });

    this.form.get('dataType').setValue(DataType.BOOL);
    this.form.get('defaultValue').setValue('0');
  }

  getData() {
    this.subscriptions.push(this.route.params.subscribe(params => {
      this.appId = params.aid;
    }));
  }

  createFlag() {
    if (!this.form.valid) {
      return;
    }

    const flag = new FlagDto();
    flag.appId = this.appId;
    flag.name = this.form.get('name').value;
    flag.dataType = this.form.get('dataType').value;
    flag.description = this.form.get('description').value;
    flag.defaultValue = this.form.get('defaultValue').value;
    flag.expirationDate = new Date(Date.parse(this.form.get('expirationDate').value));

    console.log(flag);

    this.subscriptions.push(this.flagsService.createFlags([flag]).subscribe(
      () => {
        this.snackBar.open('Successfully created flag!', '', {
          duration: 3000
        });
        this.goBack();
      },
      (error: ExceptionDto) => {
        if (error.status === 1001) {
          this.snackBar.open('DB Error: Flag name already exists. Choose a new name.', '', {
            duration: 3000
          });
        } else {
          this.snackBar.open('Error occurred. Check logs', '', {
            duration: 3000
          });
          console.log(error);
        }
      }
    ));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(value => value.unsubscribe());
  }

  changeType($event: MatSelectChange) {
    this.flagType = $event.value;
  }

  goBack() {
    this.router.navigate(['/applications/' + this.appId]);
  }
}

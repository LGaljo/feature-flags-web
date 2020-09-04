import {Component, OnDestroy, OnInit} from '@angular/core';
import {Application} from '../../../models/Application';
import {FlagDto} from '../../../models/FlagDto';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {FlagsService} from '../../../services/flags.service';
import {AppsService} from '../../../services/apps.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataType} from '../../../models/Flag';
import {MatSelectChange} from '@angular/material/select';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ExceptionDto} from '../../../models/ExceptionDto';

@Component({
  selector: 'app-create-flag',
  templateUrl: './create-flag.component.html',
  styleUrls: ['./create-flag.component.css']
})
export class CreateFlagComponent implements OnInit, OnDestroy {

  id: number;
  form: FormGroup;

  flagType: DataType = DataType.BOOL;

  private subscriptions: Subscription[] = [];

  constructor(
    private appsService: AppsService,
    private flagsService: FlagsService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.getData();
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      dataType: ['', Validators.required],
      defaultValue: ['', Validators.required]
    });

    this.form.get('dataType').setValue(DataType.BOOL);
    this.form.get('defaultValue').setValue('0');
  }

  getData() {
    this.subscriptions.push(this.route.params.subscribe(params => {
      this.id = params.aid;
    }));
  }

  createFlag() {
    if (!this.form.valid) {
      return;
    }

    const type = this.form.get('dataType').value;

    const flag = new FlagDto();
    flag.name = this.form.get('name').value;
    flag.dataType = type;
    flag.description = this.form.get('description').value;
    flag.defaultValue = this.form.get('defaultValue').value;

    const array = [];
    array.push(flag);

    this.subscriptions.push(this.flagsService.createFlags(this.id, array).subscribe(
      () => {
        this.goBack();
      },
      (error: ExceptionDto) => {
        if (error.status === 1001) {
          this.snackBar.open('DB Error: Flag name already exists. Choose a new name.');
        } else {
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
    this.router.navigate(['/applications/' + this.id]);
  }
}

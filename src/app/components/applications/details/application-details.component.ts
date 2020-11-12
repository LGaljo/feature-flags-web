import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AppsService} from '../../../services/apps.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {FlagDto} from '../../../models/dtos/FlagDto';
import {MatDialog} from '@angular/material/dialog';
import {DialogYesnoComponent} from '../../dialog-yesno/dialog-yesno.component';
import {FlagsService} from '../../../services/flags.service';
import {RolloutDto} from '../../../models/dtos/RolloutDto';
import {RulesService} from '../../../services/rules.service';
import {AppDto} from '../../../models/dtos/AppDto';

@Component({
  selector: 'app-details',
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.css']
})
export class ApplicationDetailsComponent implements OnInit, OnDestroy {

  @Input() app: AppDto;
  flags: FlagDto[];
  rollouts: RolloutDto[];

  private subscriptions: Subscription[] = [];

  constructor(
    private appsService: AppsService,
    private flagsService: FlagsService,
    private rulesService: RulesService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.flags = [];
    this.rollouts = [];
  }

  ngOnInit(): void {
    this.subscriptions.push(this.route.params.subscribe(params => {
      this.app = new AppDto();
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
        (val: AppDto) => {
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

    this.subscriptions.push(this.rulesService.getUnfinishedRollouts(this.app.id).subscribe(
      (val: RolloutDto[]) => {
        this.rollouts = val;
      },
      error => {
        console.log(error);
      }
    ));
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

  abortRollout(rollout: RolloutDto) {
    return;
  }
}

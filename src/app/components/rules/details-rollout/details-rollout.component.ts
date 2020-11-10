import {Component, OnDestroy, OnInit} from '@angular/core';
import {Application} from '../../../models/Application';
import {FlagDto} from '../../../models/dtos/FlagDto';
import {RolloutDto} from '../../../models/dtos/RolloutDto';
import {Subscription} from 'rxjs';
import {AppsService} from '../../../services/apps.service';
import {FlagsService} from '../../../services/flags.service';
import {RulesService} from '../../../services/rules.service';
import {ActivatedRoute} from '@angular/router';
import {Flag} from '../../../models/Flag';

@Component({
  selector: 'app-details-rollout',
  templateUrl: './details-rollout.component.html',
  styleUrls: ['./details-rollout.component.css']
})
export class DetailsRolloutComponent implements OnInit, OnDestroy {

  app: Application;
  flag: FlagDto;
  sr: RolloutDto;
  private subscriptions: Subscription[] = [];

  constructor(
    private appsService: AppsService,
    private flagsService: FlagsService,
    private rulesService: RulesService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.subscriptions.push(this.route.params.subscribe(params => {
      this.app = new Application();
      this.app.id = params.aid;
      this.flag = new Flag();
      this.flag.id = params.fid;
      this.sr = new RolloutDto();
      this.sr.id = params.rid;
    }));
    this.getData();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(value => value.unsubscribe());
  }

  getData() {
    this.subscriptions.push(this.rulesService.getRollout(this.sr.id).subscribe(
      (val: RolloutDto) => {
        this.sr = val;
        this.flag = val.flag;
        this.app = val.application;
      },
      error => {
        console.log(error);
      }
    ));
  }
}

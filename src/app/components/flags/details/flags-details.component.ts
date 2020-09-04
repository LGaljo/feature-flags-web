import {Component, OnDestroy, OnInit} from '@angular/core';
import {RuleDto} from '../../../models/RuleDto';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {RulesService} from '../../../services/rules.service';
import {FlagsService} from '../../../services/flags.service';
import {FlagDto} from '../../../models/FlagDto';

@Component({
  selector: 'app-details',
  templateUrl: './flags-details.component.html',
  styleUrls: ['./flags-details.component.css']
})
export class FlagsDetailsComponent implements OnInit, OnDestroy {

  flag: FlagDto;
  flagId: number;
  appId: number;
  rules: RuleDto[];
  private subscriptions: Subscription[] = [];

  constructor(
    private flagsService: FlagsService,
    private rulesService: RulesService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.subscriptions.push(this.route.params.subscribe(params => {
      this.flagId = params.fid;
      this.appId = params.aid;
    }));

    this.subscriptions.push(this.rulesService.getRulesForFlag(this.appId, this.flagId).subscribe(params => {
      this.rules = params;
    }));
    this.subscriptions.push(this.flagsService.getFlag(this.flagId).subscribe(params => {
      this.flag = params;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(value => value.unsubscribe());
  }

}

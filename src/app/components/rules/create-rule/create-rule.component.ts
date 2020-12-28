import {Component, OnDestroy, OnInit} from '@angular/core';
import {FlagDto} from '../../../models/dtos/FlagDto';
import {Subscription} from 'rxjs';
import {AppsService} from '../../../services/apps.service';
import {ActivatedRoute} from '@angular/router';
import {FlagsService} from '../../../services/flags.service';
import {CreateRuleDto, RuleType, Share} from '../../../models/dtos/CreateRuleDto';
import {RulesService} from '../../../services/rules.service';
import {EndUsersService} from '../../../services/end-users.service';
import {CreateRolloutDto} from '../../../models/dtos/CreateRolloutDto';
import {TimeUnit} from '../../../models/dtos/RolloutDto';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AppDto} from '../../../models/dtos/AppDto';
import {EndUserDto} from '../../../models/dtos/EndUserDto';

@Component({
  selector: 'app-create-rule',
  templateUrl: './create-rule.component.html',
  styleUrls: ['./create-rule.component.css']
})
export class CreateRuleComponent implements OnInit, OnDestroy {

  app: AppDto;
  flag: FlagDto = new FlagDto();
  rule: CreateRuleDto = new CreateRuleDto();
  rollout: CreateRolloutDto;
  date: Date;
  users: EndUserDto[];

  private subscriptions: Subscription[] = [];

  constructor(
    private appsService: AppsService,
    private flagsService: FlagsService,
    private endUserService: EndUsersService,
    private rulesService: RulesService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.rule = new CreateRuleDto();
    this.rule.ruleType = RuleType.GRADUAL_ROLLOUT;
    this.rollout = new CreateRolloutDto();
    this.rollout.timeUnit = TimeUnit.MINUTES;
    this.rollout.numOfSteps = 3;
    this.rollout.interval = 20;
    this.rollout.newValue = 0;
    this.getData();
  }

  getData() {
    this.subscriptions.push(this.route.params.subscribe(params => {
      this.subscriptions.push(this.appsService.get(params.aid).subscribe(
        (val: AppDto) => {
          this.app = val;
          this.rollout.appId = val.id;
        },
        error => {
          console.log(error);
        }
      ));
    }));

    this.subscriptions.push(this.route.params.subscribe(params => {
      this.subscriptions.push(this.flagsService.getFlag(params.fid).subscribe(
        (val: FlagDto) => {
          this.flag = val;
          this.rollout.flagId = val.id;
          this.rule.dataType = this.flag.dataType;
        },
        error => {
          console.log(error);
        }
      ));
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(value => value.unsubscribe());
  }

  validShare(share: Share): boolean {
    return share !== null && share.share !== null && share.value !== null;
  }

  valid(): boolean {
    if (this.rule.ruleType === null && this.rule.dataType === null) {
      return false;
    }

    switch (this.rule.ruleType) {
      case RuleType.SAME_FOR_EVERYONE:
        if (
          this.rule.shares.length === 1 &&
          this.validShare(this.rule.shares[0])) {
          return true;
        }
        break;
      case RuleType.AB_TESTING:
        for (const item of this.rule.shares) {
          if (!this.validShare(item)) {
            return false;
          }
        }
        if (this.calcSum() === 100) {
          return true;
        }
        break;
      case RuleType.USER_SPECIFIC:
        if (
          this.rule.shares.length === 1 &&
          this.validShare(this.rule.shares[0]) &&
          this.rule.user) {
          return true;
        }
        break;
      case RuleType.GRADUAL_ROLLOUT:
        if (
          this.rollout &&
          this.rollout.newValue != null &&
          this.rollout.interval &&
          this.rollout.timeUnit &&
          this.rollout.numOfSteps
        ) {
          return true;
        }
        break;
    }
    return false;
  }

  calcSum() {
    let sum = 0;
    for (const item of this.rule.shares) {
      sum += item.share;
    }
    return sum;
  }

  createRule() {
    console.log(this.rule);

    if (this.rule.ruleType === RuleType.GRADUAL_ROLLOUT) {
      console.log(this.rollout);
      this.subscriptions.push(this.rulesService.createRollout(this.rollout).subscribe(
        (ret) => {
          this.snackBar.open('Successfully created a new rollout!', '', {
            duration: 3000
          });
          this.router.navigate(['/applications/' + this.app.id]);
        },
        error => {
          console.log(error);
          this.snackBar.open('Error occurred! Check logs.', '', {
            duration: 3000
          });
        }
      ));
    } else {
      this.subscriptions.push(this.rulesService.createRule(this.rule, this.app.id, this.flag.id).subscribe(
        (ret) => {
          this.snackBar.open('Successfully created a new rule!', '', { duration: 3000 });
          this.router.navigate(['/applications/' + this.app.id]);
        },
        error => {
          console.log(error);
          this.snackBar.open('Error occurred! Check logs.', '', { duration: 3000 });
        }
      ));
    }
  }
}

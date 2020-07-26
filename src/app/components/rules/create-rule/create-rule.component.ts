import {Component, OnDestroy, OnInit} from '@angular/core';
import {Application} from '../../../models/Application';
import {FlagDto} from '../../../models/FlagDto';
import {Subscription} from 'rxjs';
import {AppsService} from '../../../services/apps.service';
import {ActivatedRoute} from '@angular/router';
import {FlagsService} from '../../../services/flags.service';
import {CreateRuleDto, RuleType} from '../../../models/dtos/CreateRuleDto';
import {RulesService} from '../../../services/rules.service';
import {EndUser} from '../../../models/EndUser';

@Component({
  selector: 'app-create-rule',
  templateUrl: './create-rule.component.html',
  styleUrls: ['./create-rule.component.css']
})
export class CreateRuleComponent implements OnInit, OnDestroy {

  app: Application;
  flag: FlagDto = new FlagDto();
  rule: CreateRuleDto = new CreateRuleDto();
  selectedType: RuleType = RuleType.SAME_FOR_EVERYONE;
  date: Date;
  users: EndUser[];

  private subscriptions: Subscription[] = [];

  constructor(
    private appsService: AppsService,
    private flagsService: FlagsService,
    private rulesService: RulesService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.rule = new CreateRuleDto();
    this.rule.value = 0;
    this.rule.valueB = 0;
    this.rule.shareOfA = 10;
    this.getData();
  }

  getData() {
    let id;
    if (history.state.app) {
      this.app = history.state.app;
    } else {
      if (this.app && this.app.id) {
        id = this.app.id;
      } else {
        this.subscriptions.push(this.route.params.subscribe(params => {
          id = params.aid;
        }));
      }
      this.subscriptions.push(this.appsService.get(id).subscribe(
        (val: Application) => {
          this.app = val;
        },
        error => {
          console.log(error);
        }
      ));
      this.subscriptions.push(this.appsService.getUsersOfApp(id).subscribe(
        (val: EndUser[]) => {
          this.users = val;
        },
        error => {
          console.log(error);
        }
      ));
    }

    if (history.state.flag) {
      this.flag = history.state.flag;
    } else {
      this.subscriptions.push(this.route.params.subscribe(params => {
        id = params.fid;
      }));
      this.subscriptions.push(this.flagsService.getFlag(id).subscribe(
        (val: FlagDto) => {
          this.flag = val;
        },
        error => {
          console.log(error);
        }
      ));
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(value => value.unsubscribe());
  }

  valid(): boolean {
    return !this.date;
  }

  createRule() {
    this.rule.dataType = this.flag.dataType;
    this.rule.ruleType = this.selectedType;
    this.rule.flagId = this.flag.id;
    this.rule.expirationDate = new Date(this.date);

    this.subscriptions.push(this.rulesService.createRule(this.rule, this.app.id, this.flag.id).subscribe(
      (ret) => {
        console.log(ret);
      },
      error => {
        console.log(error);
      }
    ));
  }
}

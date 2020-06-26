import {Component, OnDestroy, OnInit} from '@angular/core';
import {Application} from '../../../models/Application';
import {RuleDto} from '../../../models/RuleDto';
import {FlagDto} from '../../../models/FlagDto';
import {Subscription} from 'rxjs';
import {AppsService} from '../../../services/apps.service';
import {ActivatedRoute} from '@angular/router';
import {MatSelectChange} from '@angular/material/select';

@Component({
  selector: 'app-create-rule',
  templateUrl: './create-rule.component.html',
  styleUrls: ['./create-rule.component.css']
})
export class CreateRuleComponent implements OnInit, OnDestroy {

  app: Application;
  flags: FlagDto[];

  rule: RuleDto;

  selectedType = '1';
  selectedFlag: FlagDto;

  private subscriptions: Subscription[] = [];

  constructor(
    private appsService: AppsService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.rule = new RuleDto();
    this.getData();
  }

  getData() {
    if (history.state.app) {
      this.app = history.state.app;
    } else {
      let id;
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
      if (history.state.flags) {
        this.flags = history.state.flags;
      } else {
        this.subscriptions.push(this.appsService.getFlags(id).subscribe(
          (val: FlagDto[]) => {
            this.flags = val;
          },
          error => {
            console.log(error);
          }
        ));
      }
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(value => value.unsubscribe());
  }

  selectFlag($event: MatSelectChange) {
    // ID starts with 1
    this.selectedFlag = this.flags[$event.value - 1];
  }
}

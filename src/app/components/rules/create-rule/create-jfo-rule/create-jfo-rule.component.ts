import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Application} from '../../../../models/Application';
import {CreateRuleDto, Share} from '../../../../models/dtos/CreateRuleDto';
import {EndUser} from '../../../../models/EndUser';
import {FlagDto} from '../../../../models/dtos/FlagDto';
import {Subscription} from 'rxjs';
import {EndUsersService} from '../../../../services/end-users.service';

@Component({
  selector: 'app-create-jfo-rule',
  templateUrl: './create-jfo-rule.component.html',
  styleUrls: ['./create-jfo-rule.component.css']
})
export class CreateJFORuleComponent implements OnInit, OnDestroy {
  @Input() app: Application;
  @Input() rule: CreateRuleDto;
  @Input() flag: FlagDto;

  users: EndUser[];
  private subscriptions: Subscription[] = [];

  constructor(
    private endUserService: EndUsersService,
  ) { }

  ngOnInit(): void {
    this.rule.shares = [new Share(0, 100)];
    this.subscriptions.push(this.endUserService.getUsersOfApp(this.app.id).subscribe(
      (val2: EndUser[]) => {
        this.users = val2;
      },
      error => {
        console.log(error);
      }
    ));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(value => value.unsubscribe());
  }

}

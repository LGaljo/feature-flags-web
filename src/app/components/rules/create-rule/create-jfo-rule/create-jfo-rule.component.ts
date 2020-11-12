import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CreateRuleDto, Share} from '../../../../models/dtos/CreateRuleDto';
import {FlagDto} from '../../../../models/dtos/FlagDto';
import {Subscription} from 'rxjs';
import {EndUsersService} from '../../../../services/end-users.service';
import {AppDto} from '../../../../models/dtos/AppDto';
import {EndUserDto} from '../../../../models/dtos/EndUserDto';

@Component({
  selector: 'app-create-jfo-rule',
  templateUrl: './create-jfo-rule.component.html',
  styleUrls: ['./create-jfo-rule.component.css']
})
export class CreateJFORuleComponent implements OnInit, OnDestroy {
  @Input() app: AppDto;
  @Input() rule: CreateRuleDto;
  @Input() flag: FlagDto;

  users: EndUserDto[];
  private subscriptions: Subscription[] = [];

  constructor(
    private endUserService: EndUsersService,
  ) { }

  ngOnInit(): void {
    this.rule.shares = [new Share(0, 100)];
    this.subscriptions.push(this.endUserService.getUsersOfApp(this.app.id).subscribe(
      (val2: EndUserDto[]) => {
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

import {Component, Input, NgZone, OnInit} from '@angular/core';
import {CreateRuleDto, Share} from '../../../../models/dtos/CreateRuleDto';
import {FlagDto} from '../../../../models/dtos/FlagDto';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AppDto} from '../../../../models/dtos/AppDto';

@Component({
  selector: 'app-create-abt-rule',
  templateUrl: './create-abt-rule.component.html',
  styleUrls: ['./create-abt-rule.component.css']
})
export class CreateABTRuleComponent implements OnInit {
  @Input() app: AppDto;
  @Input() rule: CreateRuleDto;
  @Input() flag: FlagDto;

  classes = ['bg-dark', 'bg-warning', 'bg-primary', 'bg-success', 'bg-secondary', 'bg-info', 'bg-danger'];

  constructor(
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.rule.shares = [new Share(0, 50)];
    this.rule.shares.push(new Share(1, 50));
  }

  changeValueBOOL() {
    this.rule.shares[1].share = 100 - this.rule.shares[0].share;
  }

  addGroup() {
    this.rule.shares.push(new Share(0, 10));
  }

  removeGroup(i: number) {
    if (this.rule.shares.length < 3) {
      this.snackBar.open('Minimum of two groups', '', {duration: 1000});
      return;
    } else {
      this.rule.shares.splice(i, 1);
    }
  }
}


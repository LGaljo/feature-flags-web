import {Component, Input, OnInit} from '@angular/core';
import {CreateRuleDto, Share} from '../../../../models/dtos/CreateRuleDto';
import {FlagDto} from '../../../../models/dtos/FlagDto';
import {AppDto} from '../../../../models/dtos/AppDto';

@Component({
  selector: 'app-create-sae-rule',
  templateUrl: './create-sae-rule.component.html',
  styleUrls: ['./create-sae-rule.component.css']
})
export class CreateSAERuleComponent implements OnInit {
  @Input() app: AppDto;
  @Input() rule: CreateRuleDto;
  @Input() flag: FlagDto;

  constructor() {
  }

  ngOnInit(): void {
    this.rule.shares = [new Share(0, 100)];
    this.rule.changeDefault = false;
  }
}

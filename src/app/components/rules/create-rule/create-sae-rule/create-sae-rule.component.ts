import {Component, Input, OnInit} from '@angular/core';
import {Application} from '../../../../models/Application';
import {CreateRuleDto, Share} from '../../../../models/dtos/CreateRuleDto';
import {FlagDto} from '../../../../models/dtos/FlagDto';

@Component({
  selector: 'app-create-sae-rule',
  templateUrl: './create-sae-rule.component.html',
  styleUrls: ['./create-sae-rule.component.css']
})
export class CreateSAERuleComponent implements OnInit {
  @Input() app: Application;
  @Input() rule: CreateRuleDto;
  @Input() flag: FlagDto;

  constructor() {
  }

  ngOnInit(): void {
    this.rule.shares = [new Share(0, 100)];
  }
}

import {Component, Input, OnInit} from '@angular/core';
import {Application} from '../../../../models/Application';
import {CreateRuleDto, Share} from '../../../../models/dtos/CreateRuleDto';
import {FlagDto} from '../../../../models/dtos/FlagDto';
import {CreateRolloutDto} from '../../../../models/dtos/CreateRolloutDto';

@Component({
  selector: 'app-create-gro-rule',
  templateUrl: './create-gro-rule.component.html',
  styleUrls: ['./create-gro-rule.component.css']
})
export class CreateGRORuleComponent implements OnInit {
  @Input() app: Application;
  @Input() rule: CreateRuleDto;
  @Input() rollout: CreateRolloutDto;
  @Input() flag: FlagDto;

  constructor() { }

  ngOnInit(): void {
  }
}

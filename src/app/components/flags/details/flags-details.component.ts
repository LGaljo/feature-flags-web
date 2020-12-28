import {Component, OnDestroy, OnInit} from '@angular/core';
import {RuleDto} from '../../../models/dtos/RuleDto';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {RulesService} from '../../../services/rules.service';
import {FlagsService} from '../../../services/flags.service';
import {FlagDto} from '../../../models/dtos/FlagDto';
import {DialogYesnoComponent} from '../../dialog-yesno/dialog-yesno.component';
import {MatDialog} from '@angular/material/dialog';

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
    public dialog: MatDialog,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.subscriptions.push(this.route.params.subscribe(params => {
      this.flagId = params.fid;
      this.appId = params.aid;
    }));

    this.subscriptions.push(this.flagsService.getFlag(this.flagId).subscribe(params => {
      this.flag = params;
    }));
    this.subscriptions.push(this.rulesService.getRulesForFlag(this.appId, this.flagId).subscribe(params => {
      this.rules = params;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(value => value.unsubscribe());
  }

  removeFlagDialog() {
    const dialogRef = this.dialog.open(DialogYesnoComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.subscriptions.push(this.flagsService.removeFlag(this.flagId).subscribe(rs => {
          console.log(rs.status);
        }));
        this.router.navigate(['/applications/' + this.appId]);
      }
    });
  }
}

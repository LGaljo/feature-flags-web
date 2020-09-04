import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.css']
})
export class FrontPageComponent implements OnInit {
  title = 'feature-flags-web';

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  gotToApps() {
    this.router.navigate(['/applications']);
  }

  gotToInfo() {
    this.router.navigate(['/info']);
  }
}

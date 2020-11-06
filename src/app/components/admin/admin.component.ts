import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  step = 0;
  hidden = true;

  constructor() { }

  ngOnInit(): void {
  }

  seedData() {

  }

  clearDatabase() {
    if (this.hidden) {
      this.hidden = false;
    }
    this.step += 1;
    if (this.step === 5) {
      this.hidden = false;
    }
  }
}

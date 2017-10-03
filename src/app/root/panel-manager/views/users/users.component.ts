import { Component, OnInit, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit, OnDestroy {

  @Input("view") view;

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {
    //clearInterval();
  }

}
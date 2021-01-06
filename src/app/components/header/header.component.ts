import { Component, OnInit } from '@angular/core';
import {AppStateService} from '../../services/app-state.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(public state: AppStateService, public userService: UserService) { }

  ngOnInit() {}

}

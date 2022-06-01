import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  userData: User = new User;
  
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userData = this.userService.pasteOnInit();
  }

  ngOnDestroy(): void {
    this.userService.pasteOnDestroy();
  }
}

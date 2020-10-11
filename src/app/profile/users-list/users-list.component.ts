import { Component, Input, OnInit } from '@angular/core';
import { ProfileService} from '../../services/profile.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  @Input() userName: string;
  @Input() firstname: string;
  @Input() lastname: string;
  @Input() service: string;

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    //this.profileService.fromUsersList = true;
  }

  onSeeProfile() {
    this.profileService.searchingSubject.next(false);
    this.profileService.getProfileByUserName(this.userName);
  }
}

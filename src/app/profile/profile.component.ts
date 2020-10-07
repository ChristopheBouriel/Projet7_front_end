import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Router } from '@angular/router';
import { Profile } from '../models/profile';
import { ProfileService} from '../services/profile.service';
import { PublicationService} from '../services/publication.service';
import { AuthService} from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userProfile: string;
  loading: boolean;

  profile: Profile;
  fromPost: number;
  userName: string;
  isMine: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private profileService: ProfileService,
              private publicationService: PublicationService,
              private authService: AuthService)
               { }

  ngOnInit() {
    this.loading = true;
    this.authService.userName$.subscribe(
      (userName) => {
        this.userName = userName
        console.log(userName)
      })
    this.userProfile = this.route.snapshot.params['userName'];
    console.log(this.userProfile)
    this.fromPost = this.publicationService.lastSeen;
    if (this.userProfile === this.userName) {this.isMine = true;}
    //this.publicationSubscription = 
    this.profileService.profileSubject.subscribe(
      (profile: Profile) => {
        this.profile = profile[0];
        //this.postAnchor = '/publications\#' + this.publication.id
        //console.log(this.postAnchor)
      }
    );
    this.profileService.getProfileByUserName(this.userProfile);
    
    this.loading = false;
  }

  ngDoCheck() {
    this.userProfile = this.route.snapshot.params['userName'];
    if (this.userProfile === this.userName && this.isMine !== true) {
    this.isMine = true;
    this.profileService.getProfileByUserName(this.userName);}
  }

}

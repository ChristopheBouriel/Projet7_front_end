import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Router } from '@angular/router';
import { Profile, ShortProfile } from '../models/profile';
import { Publication } from '../models/publication';
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
  publications: Publication[];
  shortProfiles: ShortProfile[];
  usersNameList: string[] = new Array;

  fromPost: number;

  fromUsersList: boolean;
  noUser: string = '';
  
  fromList: boolean ;
  userName: string;
  isMine: boolean;
  searching: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private profileService: ProfileService,
              private publicationService: PublicationService,
              private authService: AuthService) { }

  ngOnInit() {
    this.loading = true;
    
    this.authService.userName$.subscribe(
      (userName) => {
        this.userName = userName;
        console.log(userName);
      });
      
    this.userProfile = this.route.snapshot.params['userName'];
    
    this.publicationService.fromProfileSubject.next(this.userProfile);
    
    //this.fromList = this.publicationService.fromList;

    if (this.userProfile === this.userName) {this.isMine = true;}
     
    this.profileService.profileSubject.subscribe(
      (profile: Profile) => {
        this.profile = profile[0];
      }
    );

    this.profileService.userPublicationsSubject.subscribe(
      (publications:any[]) => {
        this.publications = publications;  
      }
    );
    
    this.profileService.getProfileByUserName(this.userProfile);

    this.profileService.searchingSubject.subscribe(
      (search:boolean) => {
        this.searching = search;
      }
    );
    this.loading = false;
  }

  ngDoCheck() {
    this.userProfile = this.route.snapshot.params['userName'];
    if (this.userProfile === this.userName && this.isMine !== true) {
    this.isMine = true;
    this.profileService.getProfileByUserName(this.userName);
    console.log('Là')
    };

    if(this.searching===false) {this.noUser = '';}
    this.fromPost = this.publicationService.fromPost;
    console.log(this.fromPost);
  
    this.publicationService.fromListSubject.subscribe(
      (fromList:boolean) => {
        this.fromList = fromList;
      })      
    console.log(this.fromList);
  }

  onGetList() {

    this.profileService.usersListSubject.subscribe(
      (users: any[]) => {
        this.shortProfiles = users; 
        for (let i of users) {
          this.usersNameList.push(i.userName)
        }
      }
    );

    this.profileService.getUsersList();
    this.searching = true;
    this.fromUsersList = true;
    console.log(this.usersNameList)
  }

  onBackFromList() {
    this.searching = false;
  }

  onSearch(inputUserName) {
    const check = this.usersNameList.includes(inputUserName);
    if(check) {
      this.profileService.getProfileByUserName(inputUserName);
    console.log(inputUserName)
    this.searching = false;
    } else {
      this.noUser = 'Utilisateur inconnu';
    }
  }
}

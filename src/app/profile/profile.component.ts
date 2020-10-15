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
  aboutMe: string;

  fromPost: number;

  fromUsersList: boolean;
  noUser: string = '';
  
  fromList: boolean ;
  userName: string;
  isMine: boolean;
  searching: boolean;
  gotUsersList: boolean;
  ifBack: boolean;

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
        if (this.profile.aboutMe !== 'null') {
          this.aboutMe = this.profile.aboutMe.replace(/&µ/gi,'\"');
        }
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
    this.gotUsersList = false;
    this.loading = false;
  }

  ngDoCheck() {
    this.userProfile = this.route.snapshot.params['userName'];
    if (this.userProfile === this.userName && this.profileService.seeMine === true) {
      
    this.isMine = true;
    this.profileService.seeMine = false;
    this.profileService.getProfileByUserName(this.userName).then(
      () => this.checkAboutMe()
    );
    
    this.ifBack = true;
    
    } else if (this.userProfile !== this.userName) {this.isMine = false;}
    if (this.userProfile !== this.userName && this.ifBack === true) {
      this.profileService.getProfileByUserName(this.userProfile).then(
        () => this.checkAboutMe()
      );
      this.ifBack = false}

    

    if(this.searching===false) {this.noUser = '';}
    this.fromPost = this.publicationService.fromPost;
    console.log(this.fromPost);
  
    this.publicationService.fromListSubject.subscribe(
      (fromList:boolean) => {
        this.fromList = fromList;
      })      
    console.log(this.fromList);
    console.log('Là')
  }

  checkAboutMe() {
    if (this.profile.aboutMe !== '') {
      this.aboutMe = this.profile.aboutMe.replace(/&µ/gi,'\"');
    } else { this.aboutMe = '' }
  }

  onGetList() {
      this.profileService.usersListSubject.subscribe(
      (users: any[]) => {
        this.shortProfiles = users;
        if (this.gotUsersList === false) {
          for (let i of users) {
          this.usersNameList.push(i.userName)
          }
        }
        this.gotUsersList = true;
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

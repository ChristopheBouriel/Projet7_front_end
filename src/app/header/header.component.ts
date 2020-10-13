import { Component, OnInit } from '@angular/core';
import { AuthService} from '../services/auth.service';
import { ProfileService} from '../services/profile.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService,
              private profileService: ProfileService) { }

  isAuth: boolean;
  authSubscription: Subscription;
  userNameSubscription: Subscription;
  userName: string;
  headMessage: string;
  showMessage: boolean;
  

  ngOnInit() {
    this.authSubscription = this.authService.isAuth$.subscribe(
      (auth) => {
        this.isAuth = auth;
      }
    );

    this.userNameSubscription = this.authService.userName$.subscribe(
      (userName: string) => {
        this.userName = userName;
        
        console.log(this.userName);
      }
    );
  }

  ngDoCheck() {
    this.authService.headMessage$.subscribe(
      (headMessage: string) => {
        this.headMessage = headMessage;
        this.showMessage = true;
        if (headMessage !== '')
        this.authService.clearMessage();
      }
    )
  }

  

  onSeeMine() {
    this.profileService.seeMine = true;
  }

  onLogout() {
    this.authService.logout();
    //this.isAuth=false;
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
    //this.userNameSubscription.unsubscribe();
  }

  

}

import { Component, OnInit } from '@angular/core';
import { AuthService} from '../services/auth.service';
import { ProfileService} from '../services/profile.service';
import { Notification } from '../models/notifications';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {


  userName: string;
  notifications : any[];
  notificationsSubscription: Subscription;

  constructor(private authService: AuthService,
              private profileService: ProfileService) { }

  ngOnInit()  {
    this.authService.userName$.subscribe(
      (userName) => {
        this.userName = userName}
    )

    this.notificationsSubscription = this.profileService.notificationsSubject.subscribe(
        (notifications: any[]) => {
        this.notifications = notifications;      
      }
    );

    this.profileService.getNews(this.userName);   
  }

  ngOnDestroy() {
    this.notificationsSubscription.unsubscribe();
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { AuthService } from '../../services/auth.service';
import { Profile } from '../../models/profile';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  profile: Profile;

  passwordForm: FormGroup;
  userNameForm: FormGroup;
  userName: string;
  errorMsg: string;
  loading: boolean;
  notChanging: boolean;
  //isAuth: boolean;
  modPass: boolean;
  modName: boolean;
  makeSure: boolean;


  constructor(private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
      this.profileService.profileSubject.subscribe(
        (profile: Profile) => {
          this.profile = profile;
        }
      )

      this.route.params.subscribe(
        (params) => {
          this.userName = params.userName;
          this.profileService.getProfileByUserName(params.userName)
        }
      )

this.passwordForm = this.formBuilder.group({
      newPassword: [null, Validators.required],
    });

this.userNameForm = this.formBuilder.group({
      newUserName: [null, Validators.required],
    });

    this.notChanging = true;
  }

  onChangePassword() {

    this.modPass = true;
    this.notChanging = false;
  }

  onChangeUserName() {

    this.modName = true;
    this.notChanging = false;
  }

  onWantToDelete() {
    this.notChanging = false;
    this.makeSure = true;
  }

  onDeleteAccount() {

    this.authService.deleteAccount(this.userName).then(
      () => {
        this.authService.headMessage$.next('Votre compte a bien été supprimé');
        this.makeSure = false;
        this.authService.isAuth$.next(false);
      }
    ).catch(
          (error) => {           
            console.error(error);
            this.errorMsg = error.message;
          }
        );
  }

  onModifyPassword() {    
    const password = this.passwordForm.get('newPassword').value;    
    const email = this.profile[0].email;    
    this.authService.modifyPassword(password, email).then(
      () => {
        this.router.navigate(['profile/', this.profile[0].userName]);
        this.authService.headMessage$.next('Votre mot de passe a bien été modifié');
      }
    ).catch(
          (error) => {           
            console.error(error);
            this.errorMsg = error.message;
          }
        );
  }

  onModifyUserName() {    
    const userName = this.userNameForm.get('newUserName').value;
    const email = this.profile[0].email;
    this.authService.modifyUserName(userName, email).then(
      (response) => {

        if (response === 'User already exists') {
          //this.router.navigate(['profile/', this.profile[0].userName]);
          //this.loading = false;
          this.errorMsg = 'Le nom est déjà pris';
        } else if (response === 'Update done') {
          this.authService.userName$.next(userName)
          this.router.navigate(['profile/', userName]);
          this.authService.headMessage$.next('Votre nom d\'utilisateur a bien été modifié');
          
        };
      }
    ).catch(
          (error) => {
            console.error(error);
            this.errorMsg = error.message;
          }
        );
  }

  onCancel() {
    this.notChanging = true;
    this.modPass = false;
    this.modName = false;
    this.errorMsg = '';
  }
  
}



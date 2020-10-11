import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { Profile } from '../models/profile';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {

  profileForm: FormGroup;
  mode: string;
  loading: boolean;
  profile: Profile;
  errorMsg: string;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private profileService: ProfileService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.loading = true;
    this.route.params.subscribe(
      (params) => {
        console.log(params)
        if (!params.username) {
          this.mode = 'new';
          this.initEmptyForm();
          this.loading = false;
        } else {
          this.mode = 'edit';
          this.profileService.getProfileByUserName(params.username).then(
            (profile: Profile) => {
              this.profile = profile[0];
              this.initModifyForm(this.profile);
            }
          )
        }
      }
    );
  }

  initEmptyForm() {
    console.log('new')
    this.profileForm = this.formBuilder.group({
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      username: [null, Validators.required],
      password: [null, Validators.required],
      department: [null, Validators.required],
      email: [null, Validators.required],
      aboutMe: [null],
    });
  }

  initModifyForm(profile) {
    console.log(profile.firstname)
    this.profileForm = this.formBuilder.group({
      firstname: [profile.firstname, Validators.required],
      lastname: [profile.lastname, Validators.required],
      username: [profile.userName, Validators.required],
      password: [null],
      department: [profile.service, Validators.required],
      email: [profile.email, Validators.required],
      aboutMe: [profile.aboutMe],
    });
    this.loading = false;
  }

  onSubmit() {

    this.loading = true;
    const firstname = this.profileForm.get('firstname').value;
    const lastname = this.profileForm.get('lastname').value;
    const username = this.profileForm.get('username').value;
    
      const password = this.profileForm.get('password').value;
    
    
    const dept = this.profileForm.get('department').value;
    const email = this.profileForm.get('email').value;
    const aboutMe = this.profileForm.get('aboutMe').value;
    
    if (this.mode === 'new') {
      this.authService.signUp(firstname, lastname, username, password, dept, email, aboutMe).then(
      (response) => {
        this.authService.loginUser(username, password).then(
          () => {
            this.loading = false;
            this.router.navigate(['publications']);
          }
        ).catch(
          (error) => {
            this.loading = false;
            console.error(error);
            this.errorMsg = error.message;
          }
        );
      }
    ).catch(
      (error) => {
        this.loading = false;
        this.errorMsg = error.message;
      }
    );
    } else if (this.mode === 'edit') {
      this.profileService.modifyProfile(firstname, lastname, username, 
        dept, email, aboutMe).then(
          () => {
            this.loading = false;
            this.router.navigate(['profile/', this.profile.userName]);
          }
        ).catch(
          (error) => {
            this.loading = false;
            console.error(error);
            this.errorMsg = error.message;
          }
        );
    }
    
  }

}


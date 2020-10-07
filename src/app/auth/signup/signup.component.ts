import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  errorMsg: string;
  loading: boolean;
  //isAuth: boolean;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
      this.signUpForm = this.formBuilder.group({
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      username: [null, Validators.required],
      password: [null, Validators.required],
      department: [null, Validators.required],
      email: [null, Validators.required],
      aboutMe: [null],
    });
  }

  onSignUp() {
    this.loading = true;
    const firstname = this.signUpForm.get('firstname').value;
    const lastname = this.signUpForm.get('lastname').value;
    const username = this.signUpForm.get('username').value;
    const password = this.signUpForm.get('password').value;
    const dept = this.signUpForm.get('department').value;
    const email = this.signUpForm.get('email').value;
    const aboutMe = this.signUpForm.get('aboutMe').value;
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
    
  }

}

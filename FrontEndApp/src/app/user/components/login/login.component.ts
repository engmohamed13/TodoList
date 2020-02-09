import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { businessExceptionModel, errorsUtility } from 'src/app/_shared/common/errors.utility';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { NotificationType } from 'src/app/_shared/components/notification/notification.component';
import { NotificationService } from 'src/app/_shared/services/notification.service';
import { LoginModel } from 'src/app/_shared/models/loginModel';
import { AuthService } from 'src/app/_shared/services/auth/auth.Service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  

  loginForm: FormGroup;
  returnUrl: string;
  businessException: businessExceptionModel;

  public validationMessages = {
      username_required: 'Email_Required_Message',
      password_required: 'Password_Required_Message',
  };

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private loginService: LoginService,
      private auth: AuthService,
      public router: Router,
    /// private loadingService: LoadingService,
   private notification: NotificationService
      )
       { }

  ngOnInit() {

      this.loginForm = this.formBuilder.group({
          username: ['', [Validators.required]],
          password: ['', [Validators.required]],
          rememberMe: [],
      });
      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
     // this.loadingService.showLoading();

      var myloginModel = new LoginModel();
      myloginModel = {
          userName: this.loginForm.controls.username.value,
          password: this.loginForm.controls.password.value,
          RememberMe: this.loginForm.controls.rememberMe.value,
          Grant_type: "password",
          Refresh_token: ""
      };
      this.loginService.Login(myloginModel).then(
          data => {
              var rememberMe = this.loginForm.controls.rememberMe.value;
           // this.loadingService.hideLoading();
             this.auth.setAuthorizationToken(data, rememberMe);              
          this.router.navigate(['/todolist']);
          },
          err => {
              //this.loadingService.hideLoading();
              this.businessException = errorsUtility.getBusinessException(err);
              this.notification.showNotification(this.businessException.message, NotificationType.Error);
          });
  }

}

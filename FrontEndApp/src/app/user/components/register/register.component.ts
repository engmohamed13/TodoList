import { Component, OnInit } from '@angular/core';
import { businessExceptionModel, errorsUtility } from 'src/app/_shared/common/errors.utility';
import { FormGroup, AbstractControl, FormControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { RegisterBindingModel } from '../../models/registerBindingModel';
import { LoadingService } from 'src/app/_shared/services/loading.service';
import { TranslateService } from '@ngx-translate/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/_shared/services/notification.service';
import { NotificationType } from 'src/app/_shared/components/notification/notification.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  passwordCtrl: AbstractControl;
  confirmPasswordCtrl: AbstractControl;
  public account = {
    password: <string>null
  };


  passwordGroup: FormGroup;
  password: FormControl;
  confirmPassword: FormControl;
  formUser: FormGroup;
  businessException: businessExceptionModel;
  objUser: RegisterBindingModel;
  ckeConfig: any;
  public validationMessages = {
    FirstName_required: this.translate.instant('First name is required'),
    FirstName_minlength: this.translate.instant('First name min length 2 chars'),
    UserName_required: this.translate.instant('User name is required') ,
    UserName_pattern:  this.translate.instant('White space not valid value'),
    UserName_minlength:this.translate.instant('User name min lenght 4 chars'),
    LastName_required:this.translate.instant('Last name is reuired'),
    LastName_minlength: this.translate.instant('last name min length 2 chars'),
    Email_required:  this.translate.instant('Email is required'),
    Email_pattern:  this.translate.instant('Email not valid'),
    Password_required:  this.translate.instant('Password is required'),
    Password_pattern: this.translate.instant('Password_conditions'),
    Password_minlength:this.translate.instant('Password_length'),
    confirmPassword_required:  this.translate.instant('Confirmation password is required'),
    confirmPassword_pattern:  this.translate.instant('Password_conditions'),
    confirmPassword_isMatching:  this.translate.instant('insert_same_again')
  };


  constructor(private fb: FormBuilder,
    private loadingService: LoadingService,
    private translate: TranslateService,
    private loginService: LoginService,
    private router: Router,
    private notificationService: NotificationService,
  ) {

  }

  ngOnInit() {
    this.createForm();
  }

  public  matchValues(
    matchTo: string // name of the control to match to
  ): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
        !!control.parent.value &&
        control.value === control.parent.controls[matchTo].value
        ? null
        : { isMatching: true };
    };
}
  
  createForm() {
    this.formUser = this.fb.group({
      FirstName: ['', [Validators.required,Validators.minLength(2)]],
      LastName: ['', [Validators.required,,Validators.minLength(2)]],
      UserName: ['', [Validators.required,Validators.minLength(4),Validators.pattern(/^\S*$/)]],
      Email: ['', [Validators.required, Validators.pattern('^([a-zA-Z0-9_.+-]+)@([a-zA-Z0-9-]+[\.][a-zA-Z0-9-.]{1,})$')]],
      passwordGroup: this.fb.group({
        Password: ['', [Validators.required,Validators.minLength(8), Validators.pattern('(?=.*[a-zA-Z])(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}')]],
        confirmPassword: ['', [Validators.required, this.matchValues('Password')]]
      })
    });
    this.passwordCtrl = this.formUser.get('passwordGroup.Password') as FormControl;
    this.confirmPasswordCtrl = this.formUser.get('passwordGroup.confirmPassword') as FormControl;

  }



  
  omit_Arabic(event) {
    var charCode = event.keyCode;
    if (charCode >= '0600' || charCode <= '06ff')
      return false;
  }

  save() {
    this.createRegister();
  }
  registerBindingModel: RegisterBindingModel
  createRegister() {
    this.loadingService.showLoading();
     this.registerBindingModel= new RegisterBindingModel();
     this.registerBindingModel.FirstName = this.formUser.value.FirstName;
     this.registerBindingModel.LastName = this.formUser.value.LastName;
     this.registerBindingModel.UserName = this.formUser.value.UserName;
     this.registerBindingModel.Password = this.passwordCtrl.value;
     this.registerBindingModel.Email = this.formUser.value.Email;
    this.loginService.register(this.registerBindingModel).then(res => {
      this.loadingService.hideLoading();
      this.notificationService.showNotification(this.translate.instant('Add New User Successsfully'), NotificationType.Success)
      this.router.navigate(['/login']);
    }, error => {
      this.loadingService.hideLoading();
      var businessException = errorsUtility.getBusinessException(error);
      this.notificationService.showNotification(businessException.message, NotificationType.Error);
    })
  }

  closeCreateUser() {
    this.createForm();
  }

 

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

}

export function removeSpaces(control: AbstractControl) {
  if (control && control.value && !control.value.replace(/\s/g, '').length) {
    control.setValue('');
  }
  return null;
}

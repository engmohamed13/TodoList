import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginModel, UserInfoViewModel, loginTokenModel } from 'src/app/_shared/models/loginModel';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { RegisterBindingModel } from '../models/registerBindingModel';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
  userInfoViewModel: UserInfoViewModel = null;

  Login(loginModel:LoginModel){
    let data = "UserName=" + loginModel.userName + "&Password=" + loginModel.password + "&grant_type=password";

    return this.http.post<loginTokenModel>('Token',data,{
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
    }).toPromise();
  }
 
  register(registerBindingModel:RegisterBindingModel){
    return this.http.post('api/Account/Register',registerBindingModel).toPromise();
  }
  removeCurrentUserModel() {
    this.userInfoViewModel = null;
  }

  getCurrentUser() {
    if (this.userInfoViewModel == null) {
      return this.http.get<UserInfoViewModel>(`Account/GetCurrentUserInfo`).pipe(map(data => {
        this.userInfoViewModel = data;
        return data;
      }));
    }
    else {
      return of(this.userInfoViewModel).pipe(map(data => {
        return data;
      }));
    }
  }
}

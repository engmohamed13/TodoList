import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../services/auth/auth.Service';
import { environment } from 'src/environments/environment';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-shared-header',
  templateUrl: './shared-header.component.html',
  styleUrls: ['./shared-header.component.css']
})
export class SharedHeaderComponent implements OnInit {

  isAuthenticated: boolean = false;
  hasSocialGroups: boolean = false;
  userName: string;
  userImage: string = "";
  isArabicLanguage: boolean = false;
  completionPercentage: number = 0;
  leftProgressClass: string = "progress-bar5";
  rightProgressClass: string = "progress-bar5";
  mainProfile: any;
  environmentVars = environment;
  constructor(
    private translate: TranslateService,
    private router: Router,
    private authService: AuthService,
    private menuService: MenuService,
  ) { }

  ngOnInit() {
    if (this.translate.currentLang == "ar")
      this.isArabicLanguage = true;
    else
      this.isArabicLanguage = false;

  }

  changeLanguage() {
    if (this.translate.currentLang == "en") {
     this.authService.setCurrentLanguage("ar");
    }
    else {
      this.authService.setCurrentLanguage("en");
    }
    window.location.href = environment.baseUrl + this.router.url;

  }

}

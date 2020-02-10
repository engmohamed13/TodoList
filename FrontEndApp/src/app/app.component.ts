import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './_shared/services/auth/auth.Service';
import { NotificationService } from './_shared/services/notification.service';
import { NotificationType } from './_shared/components/notification/notification.component';
import { ToastrService } from 'ngx-toastr';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Event } from '@angular/router';
import { MenuService } from './_shared/services/menu.service';
import { LoginService } from './user/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Todo App';
  arabicLang: boolean = false;
  loading = false;
  isAuthenticated:boolean;

  constructor(private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private notificationService: NotificationService,
    private translate: TranslateService,
    private menuService: MenuService
    ) {

    this.router.events.subscribe((event: Event) => {

      switch (true) {
        case event instanceof NavigationStart: {
          //debugger;
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          setTimeout(() => {
            this.loading = false;
          }, 1500);
          this.menuService.activeItemChanged.emit();
          break;
        }
        default: {
          break;
        }
      }
    });



    notificationService.showNotificationEvent.subscribe(event => {
      this.showNotificationMessage(event.message, event.type);
    });

    notificationService.hideNotificationEvent.subscribe(event => {
      this.hideNotificationMessage();
    });

    translate.setDefaultLang('en');
    translate.use(this.authService.getCurrentLanguage());
    if (this.authService.getCurrentLanguage() == "ar") {
      this.authService.setArabicLanguageStyle();
      this.arabicLang = true;
    }

    else {
      this.authService.removeArabicStyle();
      this.arabicLang = false
    }


  }




  // Notification
  MyType = NotificationType;
  Type: NotificationType;
  Message: string = "";
  showNotification: boolean = false;
  animateIn: boolean = false;
  animateOut: boolean = false;

  showNotificationMessage(message: string, type: NotificationType) {
    switch (type) {
      case NotificationType.Success:
        this.toastr.success("", message);
        break;
      case NotificationType.Error:
        this.toastr.error("", message);
        break;
      case NotificationType.Alert:
        this.toastr.warning("", message);
        break;
    }
  }

  hideNotificationMessage() {

    this.showNotification = false;
  }

  ngOnInit() {
    this.translate.setDefaultLang('en');
    // this.notificationService.showNotificationEvent.subscribe(event => {
    //   this.showNotificationMessage(event.message, event.type);
    // });

    // this.notificationService.hideNotificationEvent.subscribe(event => {
    //   this.hideNotificationMessage();
    // });

    this.translate.setDefaultLang('en');
    this.translate.use(this.authService.getCurrentLanguage());
    if (this.authService.getCurrentLanguage() == "ar") {
      this.authService.setArabicLanguageStyle();
      this.arabicLang = true;
    }

    else {
      this.authService.removeArabicStyle();
      this.arabicLang = false
    }
  }
  
}

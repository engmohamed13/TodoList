import {
  Component,
  OnInit
} from '@angular/core';
import {
  TranslateService
} from '@ngx-translate/core';
import {
  Router
} from '@angular/router';
import { environment } from 'src/environments/environment';
declare var $: any;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  public scrollbarOptions = { mouseWheel: { enable: true }, theme: 'minimal-dark' };

  isArabicLanguage: boolean = false;
  constructor(private translate: TranslateService,
    private router: Router,
  ) { }

  ngOnInit() {

    $(document).ready(function () {

      $(".customScroll").mCustomScrollbar({
        theme: "minimal-dark",
        mouseWheel: { enable: true }
      });


    });

    if (this.translate.currentLang == "ar")
      this.isArabicLanguage = true;
    else
      this.isArabicLanguage = false;
  }

 
  isNoEvent: boolean = true;
  NoEvents(count: number) {
    if (count > 0) {
      this.isNoEvent = true;
    } else
      this.isNoEvent = false;
  }



}

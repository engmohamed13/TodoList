import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-button-loader',
  templateUrl: './button-loader.component.html',
  styleUrls: ['./button-loader.component.css']
})
export class ButtonLoaderComponent implements OnInit {

  @Output() clickAction: EventEmitter<any> = new EventEmitter();
  @Input() buttonTitle: string = "";
  @Input() buttonClass: string;
  @Input() buttonDisabled: boolean;
  @Input() isLoading: boolean;
  @Input() disabledSuccess: boolean;


  constructor(private translate: TranslateService) { }

  ngOnInit() {
  }

  clickCompleted(event) {
    this.clickAction.emit(null);
  }

  ShowLoader() {
    this.isLoading = true;
  }

  HideLoader() {
    this.isLoading = false;
  }

  GetTranslateTitle() {
    if (this.buttonTitle)
      return this.translate.instant(this.buttonTitle);
    return "";
  }
}

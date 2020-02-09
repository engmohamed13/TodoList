import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'control-messages',
  templateUrl: 'control-messages.component.html',
})


export class ControlMessagesComponent {

  @Input() control: FormControl;
  @Input() childFormGroup: FormGroup;
  @Input() validationMessages: any;
  @Input() title: string;
  @Input() inputType: 'lg-input' | 'normal-input' | 'input-with-button' = 'normal-input';

  constructor(private translate: TranslateService) { }

  get errorMessage() {

    let config = this.validationMessages;
    let message = '';

    if (this.control.dirty && !this.control.pending && this.control.errors && this.control.touched) {
      Object.keys(this.control.errors).map(key => {
   
        var keyValue = config[this.title + '_' + key];
        if (keyValue) {
          message = message + this.translate.instant(config[this.title + '_' + key]) + ' ';
        }
        else {
          message = message + "No Error Message " + ' ';
        }
      });
      return message;
    }

    if (this.childFormGroup && this.childFormGroup.errors) {
      var isControlTouched = this.childFormGroup.get(this.title).touched;
      if (!isControlTouched)
        return;

      Object.keys(this.childFormGroup.errors).map(key => {

        var keyValue = config[this.title + '_' + key];
        if (keyValue) {
          message = message + this.translate.instant(config[this.title + '_' + key]) + ' ';
        }
        else {
          message = message + "No Error Message" + ' ';
        }
      });
      return message;
    }
  }
}


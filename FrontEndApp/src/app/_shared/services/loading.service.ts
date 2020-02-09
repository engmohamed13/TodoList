import { Injectable, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor() { }

  public isLoading = new EventEmitter<boolean>();

  public onhideFooter = new EventEmitter<boolean>();

  showLoading() {
    this.isLoading.emit(true);
  }
  
  hideLoading() {
    this.isLoading.emit(false);
  }

  hideFooter() {
    this.onhideFooter.emit();
  }
}
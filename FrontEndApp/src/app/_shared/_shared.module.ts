import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpConfigInterceptor } from './interceptor/httpconfig.interceptor';
import { ErrordialogComponent } from './components/errordialog/errordialog.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from "@ngx-translate/core";
import { TruncateWordPipe } from './pipes/truncate.word.pipe';

import { TruncatePipe } from './pipes/truncate.pipe';
import{ SafePipe } from './pipes/safe.pipe';
import { SentenceCasePipe } from './pipes/sentence.case.pipe';
import { SharedHeaderComponent } from './components/shared-header/shared-header.component';
import { ControlMessagesComponent } from './components/control-messages/control-messages.component';
import { RouterModule } from '@angular/router';
import { ButtonLoaderComponent } from './components/button-loader/button-loader.component';
import { NotificationComponent } from './components/notification/notification.component';
import { OnlyNumbersDirective } from './directives/only-numbers.directive';
import { FooterComponent } from './components/footer/footer.component';
import { TruncateTextPipe } from './pipes/TruncateTextPipe';
// import { SitePageComponent } from '../home-page-module/components/site-page/site-page.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ModalBasicComponent } from './components/modal-basic/modal-basic.component';
import { ReversePipe, FilterPipe } from './pipes/ReversePipe';


@NgModule({
  declarations: [
    ErrordialogComponent,
    TruncateWordPipe,
    TruncatePipe,
    SafePipe,
    SharedHeaderComponent,
    SentenceCasePipe,
    ControlMessagesComponent,
    NotificationComponent,
    ButtonLoaderComponent,
    OnlyNumbersDirective,
    FooterComponent,
    TruncateTextPipe,
    ModalBasicComponent,
    ReversePipe,
    FilterPipe
    // SitePageComponent
],
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    RouterModule,
    FormsModule,
    CommonModule,
    NgbModule,
  
    // RouterModule.forChild([
    //   { path: 'sitePage/:id', component: SitePageComponent},
   
    // ])
    
  ],
  exports:[
    NotificationComponent,
    ButtonLoaderComponent,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
    TranslateModule,
    TruncateWordPipe,
    ControlMessagesComponent,
    TruncatePipe,
    SafePipe,
    SentenceCasePipe,
    SharedHeaderComponent,
    ControlMessagesComponent,
    OnlyNumbersDirective,
    FooterComponent,
    TruncateTextPipe,
    ModalBasicComponent,
    ReversePipe,
    FilterPipe


  ],
  
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ]
})
export class SharedModule { }

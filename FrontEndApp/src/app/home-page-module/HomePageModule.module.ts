import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../_shared/_shared.module';
import { HomePageComponent } from './components/home-page/home-page.component';
@NgModule({
  declarations: [HomePageComponent,
   ],
  imports: [
    CommonModule,
   
    SharedModule,
    RouterModule.forChild([
      { path: '', component: HomePageComponent },
      { path: 'site', component: HomePageComponent }
     

    ]),


  ]

})
export class HomePageModule { }

import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-errordialog',
  templateUrl: './errordialog.component.html',
  styleUrls: ['./errordialog.component.css']
})
export class ErrordialogComponent implements OnInit {
  title = 'Angular-Interceptor';
  data:any;
  constructor()  { }

  ngOnInit() {
  }

}

import { Component, OnInit, Input, ViewEncapsulation, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { fadeInDownOnEnterAnimation, bounceOutUpOnLeaveAnimation } from 'angular-animations';
import { NotificationComponent, NotificationType } from '../notification/notification.component';


@Component({
  selector: 'app-modal-basic',
  templateUrl: './modal-basic.component.html',
  styleUrls: ['./modal-basic.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    fadeInDownOnEnterAnimation({ anchor: 'enter', duration: 1000, delay: 100, translate: '30px' }),
    bounceOutUpOnLeaveAnimation({ anchor: 'leave', duration: 500, delay: 200, translate: '40px' })
  ]
})
export class ModalBasicComponent implements OnInit, AfterViewInit, OnDestroy {

  MyModalBasicType: ModalBasicType = ModalBasicType.Medium;

  @Input() dialogClass: string = "";
  @Input() hideHeader: boolean = false;
  @Input() hideFooter: boolean = false;
  @Input() disableAutoClose: boolean = false;
  @Input() enableContentScroll: boolean = false;
  @Input() contentHeight: string;
  @Input() modelType: ModalBasicType = ModalBasicType.Medium;
  @Input() modalBodyCssClasses: string = "";
  @ViewChild('notification') notification: NotificationComponent;
  //notification

  public visible = false;
  public visibleAnimate = false;

  constructor() { }

  ngOnInit() {

  }

  public show(): void {
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true, 100);
    //if (this.enableContentScroll)
    //setTimeout(() => this.mScrollbarService.initScrollbar('.modal-body', { axis: 'y', theme: 'light' }), 100);
  }

  public hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
  }

  public onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      if (this.disableAutoClose == false) {
        this.hide();
      }
    }
  }

  public showNotification(message: string, type: NotificationType): void {
    this.notification.show(message, type);
  }

  ngAfterViewInit() {

  }

  ngOnDestroy() {
    
  }

  getDialogSizeClass() {
    switch (this.modelType) {
      case ModalBasicType.Large:
        return "modal-lg";
      case ModalBasicType.Medium:
        return "modal-md";
      case ModalBasicType.Small:
        return "modal-sm";
    }
  }
}


export enum ModalBasicType {
  Large, Medium, Small
}
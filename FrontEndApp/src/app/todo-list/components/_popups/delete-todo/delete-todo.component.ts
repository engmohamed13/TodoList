import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { ModalBasicComponent } from 'src/app/_shared/components/modal-basic/modal-basic.component';
import { TodolistService } from 'src/app/todo-list/services/todolist.service';
import { LoadingService } from 'src/app/_shared/services/loading.service';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from 'src/app/_shared/services/notification.service';
import { NotificationType } from 'src/app/_shared/components/notification/notification.component';
import { errorsUtility } from 'src/app/_shared/common/errors.utility';

@Component({
  selector: 'app-delete-todo',
  templateUrl: './delete-todo.component.html',
  styleUrls: ['./delete-todo.component.css']
})
export class DeleteTodoComponent implements OnInit {

  @Output() onDelete: EventEmitter<any> = new EventEmitter();
  @ViewChild('basicModal') basicModal: ModalBasicComponent;

  id: string;

  constructor(

    private todolistService: TodolistService,
    private loadingService: LoadingService,
    private translateService: TranslateService,
    private notificationService: NotificationService
  ) {
    this.id = null;
  }

  ngOnInit() { }

  delete() {
    this.loadingService.showLoading();
    this.todolistService

      .delete(this.id)
      .then(response => {
        this.loadingService.hideLoading();
        this.hideModal();
        this.notificationService.showNotification(this.translateService.instant("todo deleted successfully"),
          NotificationType.Success);
        this.onDelete.emit();
      })
      .catch(error => {
        this.loadingService.hideLoading();
        const errorModel = errorsUtility.getBusinessException(error);
        this.notificationService.showNotification(
          errorModel.message,
          NotificationType.Error
        );
        this.hideModal();
      });
  }

  show(id:string) {
    this.id = id;
    this.basicModal.show();
  }

  hideModal() {
    this.basicModal.hide();
  }


}

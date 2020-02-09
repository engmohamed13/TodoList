import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { validationUtility } from 'src/app/_shared/common/validationUtility';
import { businessExceptionModel, errorsUtility } from 'src/app/_shared/common/errors.utility';
import { ModalBasicComponent } from 'src/app/_shared/components/modal-basic/modal-basic.component';
import { TranslateService } from '@ngx-translate/core';
import { LoadingService } from 'src/app/_shared/services/loading.service';
import { TodolistService } from 'src/app/todo-list/services/todolist.service';
import { NotificationService } from 'src/app/_shared/services/notification.service';
import { NotificationType } from 'src/app/_shared/components/notification/notification.component';
import { TodolistViewModel } from 'src/app/todo-list/models/todolistmodel';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.css']
})
export class EditTodoComponent implements OnInit {

  @Output() onEdit: EventEmitter<any> = new EventEmitter();
  @ViewChild("basicModel") basicModel: ModalBasicComponent;
  businessException: businessExceptionModel;
  selected: boolean = false;
  editTodolistForm: FormGroup;

  public validationMessages = { 
   Name_required: 'Name is required',
  Name_whitespace: 'Space not valid value',
  Description_required: 'Description is required',
  Description_whitespace: 'Space not valid value',



  };

  constructor(private formBuilder: FormBuilder
    , private translate: TranslateService
    , private loadingService: LoadingService
    , private todolistService: TodolistService
    , private notificationService: NotificationService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.editTodolistForm = this.formBuilder.group({
      Name: ['', [Validators.required, validationUtility.noWhitespaceValidator]],
      Description: ['', [Validators.required, validationUtility.noWhitespaceValidator]],


    });
  }

  save() {
    this.loadingService.showLoading();

    this.todolistService.edit(this.id,this.editTodolistForm.value).then(res => {
      this.onEdit.emit();
      this.loadingService.hideLoading();
      this.notificationService.showNotification(this.translate.instant("Edit TodoList Successfully"), NotificationType.Success);
      this.closeCreation();
      this.clearForm();
    },
      error => {
        this.loadingService.hideLoading();
        var businessException = errorsUtility.getBusinessException(error);
        this.notificationService.showNotification(businessException.message, NotificationType.Error);
      }
    );
  }

  clearForm() {
    this.editTodolistForm.reset();

  }

  closeCreation() {
    this.createForm();
    this.basicModel.hide();
  }
  getbyid() {
    this.todolistService.getById(this.id).then(res => {
      var todo:TodolistViewModel=res as TodolistViewModel;
      this.editTodolistForm.patchValue({
        Name: todo.Name,
        Description:todo.Description

      })
    });
  }
  id: number
  show(id: number) {
    this.createForm();
    this.id=id;
    this.getbyid();
    this.basicModel.show();
  }
}


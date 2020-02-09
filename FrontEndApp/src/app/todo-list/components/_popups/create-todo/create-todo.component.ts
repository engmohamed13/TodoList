import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { validationUtility } from 'src/app/_shared/common/validationUtility';
import { ModalBasicComponent } from 'src/app/_shared/components/modal-basic/modal-basic.component';
import { businessExceptionModel, errorsUtility } from 'src/app/_shared/common/errors.utility';
import { TranslateService } from '@ngx-translate/core';
import { LoadingService } from 'src/app/_shared/services/loading.service';
import { TodolistService } from 'src/app/todo-list/services/todolist.service';
import { NotificationService } from 'src/app/_shared/services/notification.service';
import { NotificationType } from 'src/app/_shared/components/notification/notification.component';
import { TodolistBindingModel } from 'src/app/todo-list/models/todolistmodel';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.css']
})
export class CreateTodoComponent implements OnInit {

 
  @Output() onAdded: EventEmitter<any> = new EventEmitter();
  @ViewChild("basicModel") basicModel: ModalBasicComponent;
  businessException: businessExceptionModel;
  selected: boolean = false;
  createTodolistForm: FormGroup;

  public validationMessages = {
    Name_required: 'Name is required',
    Name_whitespace: 'Space not valid value',
    Description_required: 'Description is required',
    tDescription_whitespace: 'Space not valid value',

 

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
    this.createTodolistForm = this.formBuilder.group({
      Name: ['', [Validators.required, validationUtility.noWhitespaceValidator]],
      Description: ['', [Validators.required, validationUtility.noWhitespaceValidator]],


    });
  }

  save() {
    this.loadingService.showLoading();
    var todolistBindingModel:TodolistBindingModel=new TodolistBindingModel();
    todolistBindingModel.Name=this.createTodolistForm.value.Name;
    todolistBindingModel.Description=this.createTodolistForm.value.Description;
    todolistBindingModel.CreatedDate=Date.now().toString();
    this.todolistService.createTodolist(this.createTodolistForm.value).then(res => {
      this.onAdded.emit();
      this.loadingService.hideLoading();
      this.notificationService.showNotification(this.translate.instant("Add TodoList Successfully"), NotificationType.Success);
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
    this.createTodolistForm.reset();

  }

  closeCreation() {
    this.createForm();
    this.basicModel.hide();
  }
  
  show(){
    this.createForm();
    this.basicModel.show();
  }

}

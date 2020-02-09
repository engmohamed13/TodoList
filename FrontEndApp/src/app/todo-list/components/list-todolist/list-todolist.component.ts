import { Component, OnInit, ViewChild } from '@angular/core';
import { CreateTodoComponent } from '../_popups/create-todo/create-todo.component';
import { TodolistService } from '../../services/todolist.service';
import { EditTodoComponent } from '../_popups/edit-todo/edit-todo.component';
import { TodolistViewModel } from '../../models/todolistmodel';
import { DeleteTodoComponent } from '../_popups/delete-todo/delete-todo.component';
import { AuthService } from 'src/app/_shared/services/auth/auth.Service';
import { NotificationService } from 'src/app/_shared/services/notification.service';
import { NotificationType } from 'src/app/_shared/components/notification/notification.component';

@Component({
  selector: 'app-list-todolist',
  templateUrl: './list-todolist.component.html',
  styleUrls: ['./list-todolist.component.css']
})
export class ListTodolistComponent implements OnInit {

  @ViewChild('createTotoPopup') createTotoPopup: CreateTodoComponent;
  @ViewChild('editTotoPopup') editTotoPopup: EditTodoComponent;
  @ViewChild('deleteTotoPopup') deleteTotoPopup: DeleteTodoComponent;
  keySearch
  todolists: TodolistViewModel[] = []
  thereIsNoSearchResult: boolean;
  isAuthorized:boolean;
  constructor(private todolistService: TodolistService,
    private authService:AuthService,
    private notificationService:NotificationService) { }

  ngOnInit() {

    this.getAll();
    this.isAuthorized = this.authService.isAuthenticated();

    // this.get();
  }

  add() {
    this.createTotoPopup.show();
  }
  edit(id: number) {
    this.editTotoPopup.show(id);

  }
  delete(id: string) {
    this.deleteTotoPopup.show(id);
  }
  getAll() {
    this.todolistService.get().then(res => {
      this.todolists = res;
      if (this.todolists.length == 0)
        this.thereIsNoSearchResult = true;
      else
        this.thereIsNoSearchResult = false;

    },error=>{
      this.notificationService.showNotification(error.Message,NotificationType.Alert)
    })
  }
}

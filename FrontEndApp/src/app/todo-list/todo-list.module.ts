import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../_shared/_shared.module';
import { RouterModule } from '@angular/router';
import { ListTodolistComponent } from './components/list-todolist/list-todolist.component';
import { CreateTodoComponent } from './components/_popups/create-todo/create-todo.component';
import { EditTodoComponent } from './components/_popups/edit-todo/edit-todo.component';
import { DeleteTodoComponent } from './components/_popups/delete-todo/delete-todo.component';

@NgModule({
  declarations: [ListTodolistComponent, CreateTodoComponent, EditTodoComponent, DeleteTodoComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {path:'',component:ListTodolistComponent},
    ])
  ]
})
export class TodoListModule { }

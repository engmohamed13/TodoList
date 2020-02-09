import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TodolistBindingModel, TodolistViewModel } from '../models/todolistmodel';

@Injectable({
  providedIn: 'root'
})
export class TodolistService {
 
 

  constructor(private http:HttpClient) { }

  getValue(){
    return this.http.get('api/values').toPromise();
  }
  get(){
    return this.http.get<TodolistViewModel[]>('api/TodoLists').toPromise();
  }
  edit(id: number, todolistBindingModel: TodolistBindingModel) {
    todolistBindingModel.Id=id
    return this.http.put('api/TodoLists/'+id,todolistBindingModel).toPromise();

  }
  delete(id: any) {
    return this.http.delete('api/TodoLists/'+id).toPromise();
  }

  getById(id: any) {
    return this.http.get('api/TodoLists/'+id).toPromise();
  }
  createTodolist(todolistBindingModel:TodolistBindingModel){
    return this.http.post('api/TodoLists',todolistBindingModel).toPromise();
  }
}

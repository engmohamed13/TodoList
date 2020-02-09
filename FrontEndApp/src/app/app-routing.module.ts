import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './_shared/services/auth/auth.guard';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: 'login', loadChildren: './user/user.module#UserModule', data: {} },
            { path: 'user', loadChildren: './user/user.module#UserModule', data: {} }, 
            { path: 'todolist',canActivateChild: [AuthGuard], loadChildren: './todo-list/todo-list.module#TodoListModule', data: {} },   
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: '**', redirectTo: 'login', pathMatch: 'full' }
        ])
    ],
    providers: [],
    exports: [RouterModule]
})
export class AppRoutingModule { }

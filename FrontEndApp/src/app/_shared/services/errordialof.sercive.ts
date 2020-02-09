import { Injectable } from '@angular/core';
import { ErrordialogComponent } from '../components/errordialog/errordialog.component';

@Injectable({
    providedIn:'root'
})
export class ErrorDialogService {
    constructor() { }
    openDialog(data): void {
    //     const dialogRef = this.dialog.open(ErrordialogComponent, {
    //         width: '300px',
    //         data: data
    //     }
    //     );

    //     dialogRef.afterClosed().subscribe(result => {
    //         console.log('The dialog was closed');
    //         let animal;
    //         animal = result;
    //     });
    }
}
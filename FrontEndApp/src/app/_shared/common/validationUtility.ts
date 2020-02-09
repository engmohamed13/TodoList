import { AbstractControl, FormControl } from "@angular/forms";

export class validationUtility {
    public static getEnglishPattern(): string {
        return "^[a-zA-Z,'-'' '\.0-9\n]+$";
    }

    public static getArabicPattern(): string {
        return "^[\u0621-\u064A\u0660-\u0669-\u064A0-9 ]+$";
    }

    public static getNumberPattern(): string {
        return "^[0-9]*$";
    }

    public static noWhitespaceValidator(control: FormControl) {

        if (!control.value)
            return;

        if (control.value.length == 0) {
            return;
        }
        const isWhitespace = (control.value || '').trim().length === 0;
        const isValid = !isWhitespace;
        return isValid ? null : {
            'whitespace': true
        };
    }
} 
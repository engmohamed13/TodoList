import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'sentenceCase' })
export class SentenceCasePipe implements PipeTransform {
    public transform(input: string): string {
        if (!input) {
            return '';
        } else {
            return input.replace(/([A-Z])/g, function(match) {
                return " " + match;
             });
        }
    }

}
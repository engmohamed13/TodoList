import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'truncateWord'
})

export class TruncateWordPipe implements PipeTransform {

    transform(value: string, args: string[]): string {
        const limit = args.length > 0 ? parseInt(args[0], 10) : 20;
        const trail = args.length > 1 ? args[1] : '...';

        var wordsCount = value.split(' ').length;

        return wordsCount > limit ? this.getWords(value, limit) + trail : value;
    }

    private getWords(value, limit) {
        var selectedWords = "";
        var words = value.split(' ');
        for (let index = 0; index < limit; index++) {
            selectedWords += words[index] + " ";
        }
        return selectedWords;
    }
}
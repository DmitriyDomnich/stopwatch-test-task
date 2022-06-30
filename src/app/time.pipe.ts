import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time',
})
export class TimePipe implements PipeTransform {
  transform(inputSeconds: number): string {
    inputSeconds++;
    let minutes = Math.floor(inputSeconds / 60);
    let seconds = (inputSeconds - minutes * 60).toString().padStart(2, '0');
    return `${minutes.toString().padStart(2, '0')}:${seconds}`;
  }
}

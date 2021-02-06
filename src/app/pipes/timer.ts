import { Pipe } from '@angular/core';

@Pipe({ name: 'timer' })
export class TimerPipe {
    transform(time: number): string {
        return time ? (time/1000).toFixed(2) + ' seconds' : '';
      }
}
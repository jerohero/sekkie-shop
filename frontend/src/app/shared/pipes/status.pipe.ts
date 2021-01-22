import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {
  transform(value: any) {
    switch (value) {
      case 'ON_HOLD':
        return 'On Hold';
      case 'SHIPPING':
        return 'Shipping';
    }
  }
}

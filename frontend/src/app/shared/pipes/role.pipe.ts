import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'role'
})
export class RolePipe implements PipeTransform {
  transform(value: any) {
    switch (value) {
      case 'ROLE_USER':
        return 'user';
      case 'ROLE_ADMIN':
        return 'admin';
    }
  }
}

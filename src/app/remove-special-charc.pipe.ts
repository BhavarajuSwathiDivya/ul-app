import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeSpecialCharc'
})
export class RemoveSpecialCharcPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.replace(/[^0-9a-zA-Z]/g," ");
  }

}

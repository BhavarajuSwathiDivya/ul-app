import { Pipe, PipeTransform } from '@angular/core';
/*
 * Return the string with specified characters
 * Takes an exponent argument that defaults to 50.
 * 
 * Usage:
 *   value | dispText:args
 * 
 * Example:
 *   {{ 'some text to diplay in the view' | dispText:10 }}
 * 
 *   formats to: 'some text 
*/
@Pipe({
  name: 'dispText'
})
export class DispTextPipe implements PipeTransform {

  transform(value: any, args?: number): any {
    let limit = isNaN(args)?50: args;
    let data = "", limitExceded :boolean;
    if(typeof value === 'string'){
      data = value.slice(0, limit);
      limitExceded = value.length>limit? true: false;
    }
    if(typeof value === 'object'){
      data = value.join(',').slice(0, limit);
      limitExceded = value.join(',').length>limit? true: false;
    }
    return limitExceded ? data + " ..."  : data;
  }

}

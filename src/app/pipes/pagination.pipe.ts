import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pagination'
})
export class PaginationPipe implements PipeTransform {

  transform(totalRecords: number, limit: number): number[] {
    const array: number[] = [];
    const div = Math.floor(totalRecords / limit);
    const module = totalRecords % limit;
    for (let i = 0; i < div; i++) {
      array.push( i + 1);
    }
    if (module > 0) {
      array.push( div + 1);
    }
    return array;
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberRange'
})
export class NumberRangePipe implements PipeTransform {

  transform(values: number[], min: number, max: number): number[] {
    return values.filter((value) => !(value < min || value > max ))
  }

}

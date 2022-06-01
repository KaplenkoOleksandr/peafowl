import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'technology'
})
export class TechnologyPipe implements PipeTransform {

  transform(value: any, filteringString: string) {
    if(value.length === 0 || filteringString === '') {
      return value;
    }

    const technologies = [];
    for(const technology of value) {
      if(technology['name'].toString().toLowerCase().indexOf(filteringString.toLowerCase()) !== -1) {
          technologies.push(technology);
        }
    }

    return technologies;
  }

}

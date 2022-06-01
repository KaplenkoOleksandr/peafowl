import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipe'
})
export class PipePipe implements PipeTransform {

  transform(value: any, filteringString: string) {
    if(value.length === 0 || filteringString === '') {
      return value;
    }

    const candidates = [];
    for(const candidate of value) {
      if(candidate['id'].toString().toLowerCase().indexOf(filteringString.toLowerCase()) !== -1 ||
        candidate['name'].toLowerCase().indexOf(filteringString.toLowerCase()) !== -1 ||
        candidate['surname'].toLowerCase().indexOf(filteringString.toLowerCase()) !== -1 ||
        candidate['email'].toLowerCase().indexOf(filteringString.toLowerCase()) !== -1) {
          candidates.push(candidate);
        }
    }

    return candidates;
  }

}

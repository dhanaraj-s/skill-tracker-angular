import { Pipe, PipeTransform } from '@angular/core';
import { Skills } from './model/skills.model';

@Pipe({
  name: 'skillfilter'
})
export class SkillsFilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
      return items.filter(it => {
        return it.skillName.toLowerCase().includes(searchText);
      });
  }
}
import {Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'associatefilter'
})
export class AssociateFilterPipe implements PipeTransform {
    transform(items: any[], nameSearch: string, idSearch: string, emailSearch: string, 
        mobileSearch: string, skillsSearch: string, ){
        if (items && items.length){
            return items.filter(item =>{
                if (nameSearch && item.name.toLowerCase().indexOf(nameSearch.toLowerCase()) === -1){
                    return false;
                }
                if (emailSearch && item.email.toLowerCase().indexOf(emailSearch.toLowerCase()) === -1){
                    return false;
                }
                if (idSearch && String(item.associateId).indexOf(String(idSearch)) === -1){
                    return false;
                }
                if (mobileSearch && String(item.mobile).indexOf(String(mobileSearch)) === -1){
                    return false;
                }
                if (skillsSearch && item.skillsString.toLowerCase().indexOf(skillsSearch.toLowerCase()) === -1){
                    return false;
                }
                return true;
           })
        }
        else{
            return items;
        }
    }
}
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
    providedIn: "root"
  })
 export class CompanyIndicatorService {
 
     private tableItems$: BehaviorSubject<any> = new BehaviorSubject('');

  constructor() {

  }
    public updateSidebarForTable(value: any) {    
      this.tableItems$.next(value);
    }
    public  getSidebarValueForTable(): Observable<any> {
          return this.tableItems$.asObservable();
      }  
}
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
    providedIn: "root"
  })
 export class NavService {
 
     private clickTable$: BehaviorSubject<any> = new BehaviorSubject('');

  constructor() {

  }
  public updateSidebarForMap(value: any) {    
    this.clickTable$.next(value);
  }
  public  getSidebarValueForMap(): Observable<any> {
        return this.clickTable$.asObservable();
    }  
}
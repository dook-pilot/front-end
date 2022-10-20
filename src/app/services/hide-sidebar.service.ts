import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
    providedIn: "root"
  })
 export class HideSidebarService {
 
     private Items$: BehaviorSubject<any> = new BehaviorSubject(true);

  constructor() {

  }
    public setHideAndShowSidebarToggle(value: any) {    
      this.Items$.next(value);
    }
    public  getHideAndShowSidebarToggle(): Observable<any> {
          return this.Items$.asObservable();
      }  
}
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
    providedIn: "root"
  })
 export class IrregularitiesOnMapService {
 
     private mapItems$: BehaviorSubject<any> = new BehaviorSubject('');

  constructor() {

  }
  public updateSidebarForMap(value: any) {    
    this.mapItems$.next(value);
  }
  public  getSidebarValueForMap(): Observable<any> {
        return this.mapItems$.asObservable();
    }  
}
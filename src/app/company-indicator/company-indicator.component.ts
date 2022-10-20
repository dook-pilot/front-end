import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { CompanyIndicatorService } from 'app/services/company-indicator.service';
import { NavService } from 'app/services/nav.service';
import { fromEvent, Observable } from 'rxjs';

 import { map, debounceTime } from 'rxjs/operators';

declare const Plotly: any;
// declare var $:any;

@Component({
  selector: 'app-company-indicator',
  templateUrl: './company-indicator.component.html',
  styleUrls: ['./company-indicator.component.css'],

})
export class CompanyIndicatorComponent implements OnInit,AfterViewInit,OnDestroy {
    public rows: any[] = [];
    one:any='';
    two:any='';
    three:any = 0;
    four:any ='';
    five:any='';
    six:any= 0;
    seven:any='';
    eight:any = '';
    nine:any =0;
    avg:any='';
    public limit: number = 10;
    public columns =[
        { name: "Company Name" ,prop:"kvk_search_text", sorting: true},
        { name: "Trade Name",prop:"kvk_tradename",sorting: true },
        { name: "Chamber of Commerce",prop:"kvk_chamber_of_commerce",sorting: true },
        { name: "Establishment No",prop:"kvk_establishment_no",sorting: true }, 
        { name: "Positive Reviews", prop:"poitive_reviews",sorting: true },
     { name: "Negative Reviews",prop:"negative_reviews",sorting: true },
        { name:"Companies at same location",prop:"duplicate_location",sorting: true},
      ];
    isRecommended: boolean;
    bs: any;
    fa: any;
    fpn: any;
    pn: any;
    oo: any;
    tt: any;
    pc: any;
    rowData: any;
    ColumnMode = ColumnMode;

    @ViewChild('search', { static: false }) search: any;
    @ViewChild('table', { static: false }) table: any;

    public temp: Array<object> = [];


  constructor(private companyIndicatorService:CompanyIndicatorService,private http: HttpClient,
private readonly changeDetectorRef: ChangeDetectorRef,private navService:NavService

) { }

  ngOnInit() {
    
    
     this.triggerTable();
     
  }
  triggerTable(){
    this.navService.getSidebarValueForMap().subscribe((val) => {
        this.companyIndicatorService.getSidebarValueForTable().subscribe(res=>{
            this.change_myselect(res);
         });
        });
  }
  public getCompanyIndicators(sel1): Observable<any> {
    return this.http.get<any>('https://5c7b-95-217-15-148.ngrok.io/vngp1_predict_pre_extracted?place_type=' + sel1);
  }
   change_myselect(sel1) {

    try {
      this.getCompanyIndicators(sel1)    
      .subscribe(
        (data:any) =>{
            let cars = data["compnaies_indicators_dict"]
            this.temp = cars;

        // push our inital complete list
        this.rows = [...this.temp];
        //  this.rows = cars;

             //	const cars = JSON.parse(x)
             let numbers = 0;
 
             for (let car of cars) {
                 if (car["irregularities"] == "Yes")
                 {
                     numbers+=1;
                 }
                 if (car["place_api_address"].length > 20) car["place_api_address"] = car["place_api_address"].substring(0, 20);
                 if (car["duplicate_location"] == 'Null') car["duplicate_location"] = '-';
                 if (car["kvk_other"] == 'Null') car["kvk_other"] = '-';
                 if (car["kvk_tradename"] == 'Null') car["kvk_tradename"] = '-';
                 if (car["kvk_partnership_name"] == 'Null') car["kvk_partnership_name"] = '-'
                 if (car["kvk_chamber_of_commerce"] == 'Null') car["kvk_chamber_of_commerce"] = '-';
                 if (car["kvk_establishment_no"] == 'Null') car["kvk_establishment_no"] = '-';

                 
                 $("#NumberIrregulars").empty();
                 if(numbers>0)
                 {
                    const result1 = sel1.replaceAll('_', ' ');
                    // $("#NumberIrregulars").append("<p>Companies with irregularities: <b> "+numbers+" </b>of irregular companies found in the<b> "+sel1+"</b> type of companies</p>");
                 $("#NumberIrregulars").append("<br><br><p style='position:absolute;top:0'> <b> "+numbers + " " + result1+ " companies found out of <b>674</b> car companies </b></p>");
                 }

             }
 
         },
      
        
      );
      
     }
    

     catch(error){
    console.log(error)
     }
}

ngAfterViewInit() {
        
    // $("#search").on("keyup", function () {
    //     var term = $(this).val().toLowerCase();
    //     $("table tbody tr").each(function () {
    //        let $row = $(this);
    //         var name = $row.find("td:nth-child(1)").text().toLowerCase();
    //         if (name.search(term) < 0) {
    //             $row.hide();
    //         } else {
    //             $row.show();
    //         }
    //     });
    // });
    // $("#search2").on("keyup", function () {
    //     var term = $(this).val().toLowerCase();
    //     $("table tbody tr").each(function () {
    //         let $row = $(this);
    //         var name = $row.find("td:nth-child(3)").text().toLowerCase();
    //         if (name.search(term) < 0) {
    //             $row.hide();
    //         } else {
    //             $row.show();
    //         }
    //     });
    // });
    fromEvent(this.search.nativeElement, 'keydown')
      .pipe(
        debounceTime(550),
        map(x => x['target']['value'])
      )
      .subscribe(value => {
        this.updateFilter(value);
      });
  this.changeDetectorRef.detectChanges();
}
updateFilter(val: any) {
    const value = val.toString().toLowerCase().trim();
    // assign filtered matches to the active datatable
    this.rows = this.temp.filter(item => {
      
        // check for a match
        if (
          (item['kvk_search_text'] &&
            item['kvk_search_text']
              .toString()
              .toLowerCase()
              .indexOf(value) !== -1) ||
          !value
        ) {
          // found match, return true to add to result set
          return true;
        }
    });
    
  }
selectBovag(row){
    this.one = row['place_api_company_name'];
    this.two = row['bovag_matched_name'];
    this.three = row['bovag_matched_name_score'];
    this.four = row['place_api_address'];
    this.five = row['bovag_matched_address'];
    this.six = row['bovag_matched_address_score'];
    this.seven =row['formatted_phone_number'];
    this.eight = row['Bovag_Matched_Telephone'];
    this.nine = row['Bovag_Matched_Telephone_score'];
    this.avg = ((parseFloat(this.three) + parseFloat(this.six) + parseFloat(this.nine))/3).toFixed(2);
                 if (this.avg >= 0.7){
                     this.isRecommended= true;
                     this.avg = 'Recommeded Match'
                 }else{
                    this.isRecommended= false;
                     this.avg = String(this.avg)
                     this.avg = this.avg   
                 }
}

selectMap(row){

    this.bs = row["business_status"];
    this.fa = row["formatted_address"];
    this.fpn = row["formatted_phone_number"];
    this.pn = row["kvk_partnership_name"];
    this.oo = row["kvk_other"];
    this.tt = row["types"];
    this.pc = row["permanently_closed"];

    var lat = row["lat_lng"][0];
    var lon = row["lat_lng"][1];
    var dataPoints = [
       {
           type: "scattermapbox",
           lon: [parseFloat(lon)],
           lat: [parseFloat(lat)],
           marker: {color: "red", size: 8}
       }
   ];
   var layout = {
                dragmode: "zoom",
                mapbox: {style: "open-street-map", center: {lat: lat, lon: lon}, zoom: 10},
                margin: {r: 0, t: 0, b: 0, l: 0},
                width: 700,
                height: 400,
            };
   Plotly.newPlot("map", dataPoints, layout);

}
ngOnDestroy (){
    this.companyIndicatorService.updateSidebarForTable('');
}
}

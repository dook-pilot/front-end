import { HttpClient } from '@angular/common/http';
import {  Component, OnDestroy, OnInit } from '@angular/core';
import { IrregularitiesOnMapService } from 'app/services/irregularities-on-map.service';
import { Observable } from 'rxjs';
declare var $:JQueryStatic;
declare const Plotly: any;


@Component({
  selector: 'app-irregularitiesOnMap',
  templateUrl: './irregularities-on-map.component.html',
  styleUrls: ['./irregularities-on-map.component.css'],


})
export class IrregularitiesOnMapComponent implements OnInit,OnDestroy {
    selectedDetail: string =null;

  constructor(
	  private irregularitiesOnMapService: IrregularitiesOnMapService,
	  private http: HttpClient
    ) { }

  ngOnInit() {
     this.irregularitiesOnMapService.getSidebarValueForMap().subscribe(res=>{
       this.change_myselect(res)

    })



  }
 change_myselect(sel1) {
	if(sel1 == ""){
		setTimeout(function () { /* snip */   
	var dataPoints = [
		{
			type: "scattermapbox",
			title:"kjsdbkjasbdkabskdjnsdnsk",
			lon: 52.087049,
			lat: 4.308188,
			text:'hello',
			hoverinfo: 'text',
			hoverlabel: {bgcolor: 'white'},
			mode:'markers',
			marker: { color: "dark-blue", size: 10 }
		}
		];




		var layout = {
		dragmode: "zoom",
		mapbox: { style: "stamen-terrain", center: { lat: 52.087049, lon: 4.308188 }, zoom: 16 },
		autosize: false,
		  width: 1200,
		 height: 722,
		margin: { r: 0, t: 0, b: 0, l: 0 }
		};
		var config = {responsive: true}

		Plotly.newPlot("map", dataPoints, layout,config);
		$("#NumberIrregulars").empty();
				
			}, 1000)
		
		}

else{
	try {
	  this.getIrregularitiesOnMap(sel1)    
	  .subscribe(
		(data:any)=> {
			let cars = data["compnaies_indicators_dict"]
			//	const cars = JSON.parse(x)
			let colors=[]
			let out = ""
			let lats= []
			let longs = []
			let text=[]
			let numbers = 0;
			for(let car of cars){
	
				if (car["irregularities"] == "Yes")
				{
					numbers+=1;
					lats.push(car["lat_lng"][0])
					longs.push(car["lat_lng"][1])
	
					if(car["rating"] == "Null")
					{
						car["rating"] = "-"
					}
	
					text.push(["<b>Company Name:</b> " 
					+ car["place_api_company_name"] +"<br>" + 
					 "<b>Bovag_registered</b>"+": "+  car["Bovag_registered"] +"<br>"
					  +"<b>KVK_found: </b>"+car["KVK_found"]+ "<br>"+ 
					  "<b>Duplicates_found: </b>"+car["duplicates_found"]+ "<br>"+
					 "<b>Rating:</b> "+car["rating"] + "<br>"+
					 "<b>Type:</b> "+sel1
				])
					colors.push("dark-blue")
				}	
			}
			
			$( "#companyTable tbody" ).append(out);
			// $( "#companyTable" ).DataTable();
			var dataPoints = [
			{
				type: "scattermapbox",
				title:"kjsdbkjasbdkabskdjnsdnsk",
				lon: longs.map(Number),
				lat: lats.map(Number),
				text:text,
				hoverinfo: 'text',
				hoverlabel: {bgcolor: 'white'},
				mode:'markers',
				marker: { color: "dark-blue", size: 10 }
			}
			];
			var layout = {
			dragmode: "zoom",
			mapbox: { style: "stamen-terrain", center: { lat: 52.05926412880043, lon: 4.324132285204885 }, zoom: 12 },
			autosize: false,
			width: 1200,
			height: 722,
			margin: { r: 0, t: 0, b: 0, l: 0 }
			};
			var config = {responsive: true}
	
			Plotly.newPlot("map", dataPoints, layout,config);
			$("#NumberIrregulars").empty();
			if(numbers>0)
			{
				// $("#NumberIrregulars").append("<p>Companies with irregularities: <b> "+numbers+" </b>of irregular companies found in the<b> "+sel1+"</b> type of companies</p>");
			// $("#NumberIrregulars").append("<br><br><p style='font-size: 1.5rem;bottom: 10px;padding: 5px;vertical-align: middle;color: black;font-weight: bold;'>Companies with irregularities: <b> "+numbers+" </b></p>");
	
		}

			},
	  );
	  
	 }
	
	 catch(error){
	console.log(error)
	 }
	}

}	

public getIrregularitiesOnMap(sel1): Observable<any> {
    return this.http.get<any>('https://5c7b-95-217-15-148.ngrok.io/vngp1_predict_pre_extracted?place_type='+ sel1);
  }
ngAfterViewInit(): void {
    
}


ngOnDestroy(): void {
	 this.irregularitiesOnMapService.updateSidebarForMap('');
}




}

import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { TabsetComponent } from "ngx-bootstrap/tabs";
import { NgxSpinnerService } from "ngx-spinner";
import { Observable } from "rxjs";

@Component({
  selector: "app-upload-image",
  templateUrl: "./upload-image.component.html",
  styleUrls: ["./upload-image.component.css"],
})
export class UploadImageComponent implements OnInit {
  files = {};
  imageSrc: string = "";
  companyName = "";
  kyk = "";
  bovag = "";
  ratings: number = 0;
  duplicate_found = "";
  liscence_number = [];
  showTable: boolean = false;
  
  targetedLiscenceNo: any;
  categories:any[] =[];
  @ViewChild('tabset') tabset: TabsetComponent;
  isDataNotFound: boolean = false;

  constructor(private http: HttpClient, private spinner: NgxSpinnerService) {}
  ngOnInit(): void {}

  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSrc = reader.result as string;

        reader.onload = function () {
          console.log(reader.result);
        };
        this.files = {
          files: event.target.files[0],
        };
      };
    }
  }
  public getCardDetails(file): Observable<any> {
    return this.http.post<any>(
      "https://5c7b-95-217-15-148.ngrok.io/vngp1_predict_license_plate",
      file
    );
  }
  submit(): void {
    this.spinner.show();
    try {
      let data = new FormData();
      if (this.files) {
        data.append("file", this.files["files"]);
        this.getCardDetails(data).subscribe((res: any) => {
          this.spinner.hide();
          this.showTable = true;
          this.companyName = res.place_api_company_name;
          this.kyk = res.KVK_found != null ? res.KVK_found : "-";
          this.bovag =
            res.Bovag_registered != null ? res.Bovag_registered : "-";
          this.ratings = res.rating != null || 0 ? res.rating : "-";
          this.duplicate_found =
            res.duplicates_found != null ? res.duplicates_found : "-";
          this.liscence_number = res.license_number;
        });
      }
    } catch (error) {
      this.spinner.hide();
      console.log(error);
    }
  }
  openLiscenceNoDetails(value) {
    this.categories=[];
    this.isDataNotFound = false;
    this.targetedLiscenceNo = value;
    try {
      this.spinner.show();
      if (this.targetedLiscenceNo ) {
        this.http.get('http://3.121.217.251/'+this.targetedLiscenceNo+'/').subscribe((res: any) => {
          this.spinner.hide();
          if(res.status == 200){
          this.categories = res.categories;
          if(this.categories.length > 0){
          this.categories[0].active = true;
          }
          }
        },(err=>{
          this.isDataNotFound = true;
          console.log(err)
        })
        );
      }
    } catch (error) {
      this.isDataNotFound = true;
      console.log(error);
    }
  }

  
  public setActiveTab(index: number): void {
     this.categories[index]['active'] = true;
    console.log(index);
  }
}

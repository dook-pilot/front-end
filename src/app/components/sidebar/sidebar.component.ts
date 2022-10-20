import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CompanyIndicatorService } from "app/services/company-indicator.service";
import { IrregularitiesOnMapService } from "app/services/irregularities-on-map.service";

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit {
  showCompanyIndicator: boolean;
  showIrregularities: boolean;

  constructor(
    private router: Router,
    private companyIndicatorService: CompanyIndicatorService,
    private irregularitiesOnMapService: IrregularitiesOnMapService
  ) {}

  ngOnInit() {}
  selectValue(e, url: any) {
    if (url == "CompanyIndicator") {
      this.companyIndicatorService.updateSidebarForTable(e.target.value);
      return this.router.navigate(["/CompanyIndicator"]);
    } else if (url == "irregularitiesOnMap") {
      this.irregularitiesOnMapService.updateSidebarForMap(e.target.value);
      return this.router.navigate(["/irregularitiesOnMap"]);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  regulatories = [];
  categories = [];
  endpointsArray =[];
  endpoints = [];
  searchfields = [];
  display = false;
  selectedInputs = [];
  searchablefields = {};
  apiUrl = '';
  recordsArray = [];
  recordsError = '';
  modelData = {};
  data = [];

  constructor(private httpService: HttpClient) { }

  ngOnInit() {
    this.data = [{
      "regulatory": "openfda",
      "categories": [
        {
          "api_name": "Animal & Veterinary API Endpoints",
          "end_points": [
            "Adverse Events"
          ]
        },
        {
          "api_name": "Drug API EndPoints",
          "end_points": [
            "Adverse Events",
            "Product Labeling",
            "NDC Directory",
            "Recall Enforcement Reports"
          ]
        },
        {
          "api_name": "Device API Endpoints",
          "end_points": [
            "510(k)",
            "Classification",
            "Recall Enforcement Reports",
            "Adverse Events",
            "Pre-market Approval",
            "Recalls",
            "Registrations and Listings",
            "Unique Device Identifier"
          ]
        },
        {
          "api_name": "Food API Endpoints",
          "end_points": [
            "Recall Enforcement Reports",
            "Adverse Events"
          ]
        },
        {
          "api_name": "Other API Endpoints",
          "end_points": [
            "NSDE"
          ]
        }
      ]
    }];
    this.data.forEach((eachItem)=>{
        this.regulatories.push({"label":eachItem.regulatory, "value": eachItem.regulatory});
    });
  }

  getCategories(regulatory) {
    this.searchablefields = {};
    this.endpointsArray =[];
    this.categories=[];
    this.data.forEach((eachItem)=>{
            if(eachItem.regulatory === regulatory)
            eachItem.categories.forEach((item)=>{
                this.categories.push({ "label": item.api_name, "value": item.api_name });
            });
            this.endpointsArray = eachItem.categories;
    });
  };
  getEndpoints(category) {
    this.searchablefields = {};
    this.endpoints = [];
    this.searchfields = [];
    this.endpointsArray.forEach((endpointAPI)=>{
                if(endpointAPI.api_name === category){
                  endpointAPI.end_points.forEach((apiname)=>{
                    this.endpoints.push( { "label": apiname, "value": apiname });
                  });
                }
    });
  }

  getSearchableFields(event) {
    this.searchablefields = {};
    this.recordsArray = [];
    this.httpService.get('./assets/jsons/searchfields.json').subscribe((data: any)=>{
      this.searchfields = data[event];
    })
    this.setapiUrl(event);
  }
  setapiUrl(apiname) {
    this.httpService.get('./assets/jsons/apiurls.json').subscribe(
      (data: {}) => {
        this.apiUrl = data[apiname];
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
  }
  showDialog(record) {
    this.modelData = record;
    this.display = true;
  }
  queryFields(event, field) {
    this.searchablefields[field] = event.target.value;
  }
  getResponse(limit) {
    let url = this.constructSearchQuery(limit);
    this.httpService.get(url).subscribe((data: any) => {
      this.recordsArray = data.results;
    }, (err) => {
      this.recordsError = err.error.error.message;
    });
  }
  constructSearchQuery(limit) {
    let keys = Object.keys(this.searchablefields);
    let searchTerms = '';
    let url = '';
    if (keys) {
      keys.forEach((key, index) => {
        if (index === keys.length - 1 && this.searchablefields[key]) {
          searchTerms += `${key}:${this.searchablefields[key]}`;
        } else if (this.searchablefields[key]) {
          searchTerms += `${key}:${this.searchablefields[key]}+AND+`;
        }
      });
    }
    if (searchTerms) {
      return url = `${this.apiUrl}?search=${searchTerms}&limit=${limit}`;
    }
    else {
      return url = `${this.apiUrl}?limit=${limit}`;
    }
  }
}

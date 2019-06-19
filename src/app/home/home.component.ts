import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient,HttpBackend } from '@angular/common/http';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import {Table} from 'primeng/components/table/table';
import { apiUrl } from '../globals';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NgbDropdownConfig]
})
export class HomeComponent implements OnInit {

  @ViewChild("Table") tableComponent: Table;
  @ViewChild("selectAllHeader") selectAllHeader: ElementRef;

  regulatories = [];
  categories = [];
  endpointsArray = [];
  endpoints = [];
  searchfields = [];
  display = false;
  selectedInputs = [];
  searchablefields = {};
  regulatoryApiUrl = '';
  recordsArray = [];
  recordsError = '';
  modelData = {};
  data: any = '';
  skip : number;
  limit: number;
  transactions: {
    date: Date,
    label: string,
    amount: number
  }[];
  categoriesArray = [];
  displayTableHeader = [];
  tableData = [];
  tableHeader = [];
  count : number;
  showTable: boolean;
  loading: boolean;
  constructor(private httpService: HttpClient, private httpClient: HttpClient, handler: HttpBackend,config: NgbDropdownConfig) {
    config.autoClose = false;
    this.httpClient = new HttpClient(handler);
  
   }

  ngOnInit() {
    this.count = 0;
    this.skip = 0;
    this.limit = 10;
    this.showTable = false;
    this.loading = true;
    this.httpService.get(`${apiUrl}/auth/filters`).subscribe((data: any) => {
        this.data = data;
        this.data.regulatories.forEach((eachItem) => {
          this.regulatories.push({ "label": eachItem.regulatory, "value": eachItem.regulatory })
        });
      }, (err) => {
        this.recordsError = err.error.error.message;
    });
    this.transactions = [
      {
        date: new Date(2017, 10, 10, 13, 10, 15),
        label: 'Third transaction',
        amount: 130
      },
      {
        date: new Date(2017, 7, 3, 9, 35, 0),
        label: 'Second transaction',
        amount: 130
      },
      {
        date: new Date(2017, 3, 27, 15, 43, 10),
        label: 'First transaction',
        amount: 130
      }
    ];
    

    
  }

  getCategories(regulatory) {
    this.searchablefields = {};
    this.endpointsArray = [];
    this.categories = [];
    this.showTable = false;
    this.recordsError= "";
    this.data.regulatories.forEach((eachItem) => {
      if (eachItem.regulatory === regulatory)
        eachItem.categories.forEach((item) => {
          this.categories.push({ "label": item.api_name, "value": item.api_name });
        });
      this.categoriesArray = eachItem.categories;
    });
  };
  getEndpoints(category) {
    this.searchablefields = {};
    this.endpoints = [];
    this.searchfields = [];
    this.showTable = false;
    this.recordsError= "";
    this.categoriesArray.forEach((endpointAPI) => {
      if (endpointAPI.api_name === category) {
        endpointAPI.end_points.forEach((apiname) => {
          this.endpoints.push({ "label": apiname.name, "value": apiname.name });
        });
        this.endpointsArray = endpointAPI.end_points;
      }
    });
  }

  getSearchableFields(selectedendpoint) {
    this.searchablefields = {};
    this.recordsArray = [];
    this.showTable = false;
    this.recordsError= "";
    this.endpointsArray.forEach((endpointAPI) => {
      if (endpointAPI.name === selectedendpoint) {
        this.searchfields = endpointAPI["search_fields"];
        this.regulatoryApiUrl = endpointAPI.uri;
      }
    });
    // this.setregulatoryApiUrl(event);
  }

  showDialog(record) {
    this.modelData = record;
    this.display = true;
  }
  queryFields(event, field) {
    this.searchablefields[field] = event.target.value;
  }
  getResponse(limit) {
    let url = this.constructSearchQuery();
    this.httpClient.get(url).subscribe((data: any) => {
      this.recordsArray = data.results;
      this.count = data.meta.results.total;
      this.initialiseTableData(event);
    }, (err) => {
      this.recordsError = "Something went wrong please try again later.";
      this.showTable = false;
    });
  }
  getData(){
    this.recordsError="";
    this.recordsArray=[];
    this.showTable = true;
    if(this.tableComponent){   
      this.tableComponent.reset();
    }
  }
  loadLazy(event){
    this.skip = event.first;
    //this.loading = true;
    this.getResponse(event);
  }
  initialiseTableData(event){  
    this.tableHeader = this.searchfields.map(o => o["name"]);
    this.displayTableHeader = this.returnMandatoryTableHeader();
    
    if(event.sortField && event.sortOrder === 1){
      this.recordsArray.sort((a,b) => (a[event.sortField] > b[event.sortField]) ? 1 : ((b[event.sortField] > a[event.sortField]) ? -1 : 0)); 
    }
    if(event.sortField && event.sortOrder === -1){
      this.recordsArray.sort((a,b) => (b[event.sortField] > a[event.sortField]) ? 1 : ((a[event.sortField] > b[event.sortField]) ? -1 : 0)); 
    }
    this.loading = false;
  }

  returnMandatoryTableHeader(){
    let fields = [];
    this.searchfields.forEach((n)=>{
      if(n["mandatory"]){
        fields.push(n["name"]);
      }
    });
    return fields;
  }

  updateTableData(headerValue){
    let indexofValue = this.displayTableHeader.indexOf(headerValue);
    if(indexofValue!==-1){
      this.displayTableHeader.splice(indexofValue,1);
    }else{
      this.displayTableHeader.push(headerValue);
    }
  }
  
  constructSearchQuery() {
    let keys = Object.keys(this.searchablefields);
    let searchTerms = '';
    let url = '';
    let skip = this.skip;
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
      return url = `${this.regulatoryApiUrl}?search=${searchTerms}&limit=${this.limit}&skip=${skip}`;
    }
    else {
      return url = `${this.regulatoryApiUrl}?limit=${this.limit}&skip=${skip}`;
    }
    
  }

  selectAllColumns(obj){
    if(obj.target.checked){
      this.displayTableHeader = this.tableHeader;
    }else{
      this.displayTableHeader = [];
    }
  }
  onTabChange(){
    this.searchablefields = {};
    this.recordsArray = [];
    this.selectedInputs =[];
    this.showTable =false;
  }
  
  resetHeaders(){
    this.displayTableHeader = this.returnMandatoryTableHeader();
    this.selectAllHeader.nativeElement.checked = false;
  }

  typeOfData(val) {
    return typeof val;
  }
}

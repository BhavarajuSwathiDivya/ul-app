import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NgbDropdownConfig]
})
export class HomeComponent implements OnInit {

  regulatories = [];
  categories = [];
  endpointsArray = [];
  endpoints = [];
  searchfields = [];
  display = false;
  selectedInputs = [];
  searchablefields = {};
  apiUrl = '';
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
  constructor(private httpService: HttpClient, config: NgbDropdownConfig) {
    config.autoClose = false;
   }

  ngOnInit() {
    this.count = 0;
    this.skip = 0;
    this.limit = 100;
    this.showTable = false;
    this.loading = true;
    this.data = {
      "regulatories": [
        {
          "regulatory": "openfda",
          "categories": [
            {
              "api_name": "Animal & Veterinary API Endpoints",
              "end_points": [
                {
                  "name": "Adverse Events",
                  "uri": "/animal/event.json",
                  "search_fields": [
                    {
                      "name": "animal.age.max",
                      "type": "float"
                    },
                    {
                      "name": "animal.age.min",
                      "type": "float"
                    },
                    {
                      "name": "animal.age.unit",
                      "type": "String"
                    },
                    {
                      "name": "animal.age.unit",
                      "type": "String"
                    },
                    {
                      "name": "administered_by",
                      "type": "String"
                    },
                    {
                      "name": "atc_vet_code",
                      "type": "String"
                    },
                    {
                      "name": "brand_name",
                      "type": "String"
                    },
                    {
                      "name": "first_exposure_date",
                      "type": "date"
                    },
                    {
                      "name": "last_exposure_date",
                      "type": "date"
                    },
                    {
                      "name": "lot_expiration",
                      "type": "date"
                    },
                    {
                      "name": "manufacturing_date",
                      "type": "date"
                    },
                    {
                      "name": "number_of_defective_items",
                      "type": "int"
                    },
                    {
                      "name": "number_of_items_returned",
                      "type": "int"
                    },
                    {
                      "name": "off_label_use",
                      "type": "String"
                    },
                    {
                      "name": "product_ndc",
                      "type": "String"
                    },
                    {
                      "name": "route",
                      "type": "String"
                    }
                  ]
                }
              ]
            },
            {
              "api_name": "Drug API EndPoints",
              "end_points": [
                {
                  "name": "Adverse Events",
                  "uri": "/drug/event.json",
                  "search_fields": [
                    {
                      "name": "authoritynumb",
                      "type": "String"
                    },
                    {
                      "name": "companynumb",
                      "type": "String"
                    },
                    {
                      "name": "occurcountry",
                      "type": "String"
                    },
                    {
                      "name": "primarysourcecountry",
                      "type": "String"
                    },
                    {
                      "name": "receiptdate",
                      "type": "String"
                    },
                    {
                      "name": "safetyreportid",
                      "type": "String"
                    },
                    {
                      "name": "receivedate",
                      "type": "String"
                    },
                    {
                      "name": "transmissiondate",
                      "type": "String"
                    }
                  ]
                },
                {
                  "name": "Product Labeling",
                  "uri": "/drug/label.json",
                  "search_fields": [
                    {
                      "name": "id",
                      "type": "String"
                    },
                    {
                      "name": "set_id",
                      "type": "String"
                    },
                    {
                      "name": "version",
                      "type": "String"
                    },
                    {
                      "name": "openfda.application_number",
                      "type": "String"
                    },
                    {
                      "name": "openfda.nui",
                      "type": "String"
                    },
                    {
                      "name": "openfda.product_ndc",
                      "type": "String"
                    },
                    {
                      "name": "openfda.product_type",
                      "type": "String"
                    },
                    {
                      "name": "openfda.product_type",
                      "type": "String"
                    },
                    {
                      "name": "openfda.product_type",
                      "type": "String"
                    },
                    {
                      "name": "openfda.spl_id",
                      "type": "String"
                    },
                    {
                      "name": "openfda.unii",
                      "type": "String"
                    },
                    {
                      "name": "openfda.upc",
                      "type": "String"
                    }
                  ]
                },
                {
                  "name": "NDC Directory",
                  "uri": "/drug/ndc.json",
                  "search_fields": [
                    {
                      "name": "product_id",
                      "type": "String"
                    },
                    {
                      "name": "spl_id",
                      "type": "String"
                    },
                    {
                      "name": "marketing_start_date",
                      "type": "String"
                    },
                    {
                      "name": "marketing_end_date",
                      "type": "String"
                    },
                    {
                      "name": "marketing_category",
                      "type": "String"
                    },
                    {
                      "name": "application_number",
                      "type": "String"
                    },
                    {
                      "name": "packaging.package_ndc",
                      "type": "String"
                    },
                    {
                      "name": "packaging.marketing_start_date",
                      "type": "String"
                    },
                    {
                      "name": "packaging.marketing_end_date",
                      "type": "String"
                    },
                    {
                      "name": "openfda.nui",
                      "type": "String"
                    },
                    {
                      "name": "openfda.spl_set_id",
                      "type": "String"
                    },
                    {
                      "name": "openfda.unii",
                      "type": "String"
                    },
                    {
                      "name": "openfda.upc",
                      "type": "String"
                    }
                  ]
                },
                {
                  "name": "Recall Enforcement Reports",
                  "uri": "/drug/enforcement.json",
                  "search_fields": [
                    {
                      "name": "code_info",
                      "type": "String"
                    },
                    {
                      "name": "country",
                      "type": "String"
                    },
                    {
                      "name": "event_id",
                      "type": "String"
                    },
                    {
                      "name": "product_code",
                      "type": "String"
                    },
                    {
                      "name": "recall_initiation_date",
                      "type": "String"
                    },
                    {
                      "name": "recall_number",
                      "type": "String"
                    },
                    {
                      "name": "recalling_firm",
                      "type": "String"
                    },
                    {
                      "name": "report_date",
                      "type": "String"
                    },
                    {
                      "name": "termination_date",
                      "type": "String"
                    },
                    {
                      "name": "termination_date",
                      "type": "String"
                    }
                  ]
                }
              ]
            },
            {
              "api_name": "Device API Endpoints",
              "end_points": [
                {
                  "name": "510(k)",
                  "uri": "/device/510k.json",
                  "search_fields": [
                    {
                      "name": "advisory_committee",
                      "type": "String"
                    },
                    {
                      "name": "applicant",
                      "type": "String"
                    },
                    {
                      "name": "clearance_type",
                      "type": "String"
                    },
                    {
                      "name": "contact",
                      "type": "String"
                    },
                    {
                      "name": "country_code",
                      "type": "String"
                    },
                    {
                      "name": "date_received",
                      "type": "String"
                    },
                    {
                      "name": "decision_code",
                      "type": "String"
                    },
                    {
                      "name": "decision_date",
                      "type": "String"
                    },
                    {
                      "name": "device_name",
                      "type": "String"
                    },
                    {
                      "name": "expedited_review_flag",
                      "type": "String"
                    },
                    {
                      "name": "k_number",
                      "type": "String"
                    },
                    {
                      "name": "product_code",
                      "type": "String"
                    },
                    {
                      "name": "review_advisory_committee",
                      "type": "String"
                    },
                    {
                      "name": "state",
                      "type": "String"
                    },
                    {
                      "name": "statement_or_summary",
                      "type": "String"
                    },
                    {
                      "name": "third_party_flag",
                      "type": "String"
                    },
                    {
                      "name": "openfda.device_class",
                      "type": "String"
                    },
                    {
                      "name": "openfda.device_name",
                      "type": "String"
                    },
                    {
                      "name": "openfda.fei_number",
                      "type": "String"
                    },
                    {
                      "name": "openfda.registration_number",
                      "type": "String"
                    },
                    {
                      "name": "openfda.regulation_number",
                      "type": "String"
                    }
                  ]
                },
                {
                  "name": "Classification",
                  "uri": "/device/enforcement.json",
                  "search_fields": [
                    {
                      "name": "device_class",
                      "type": "String"
                    },
                    {
                      "name": "device_name",
                      "type": "String"
                    },
                    {
                      "name": "gmp_exempt_flag",
                      "type": "String"
                    },
                    {
                      "name": "implant_flag",
                      "type": "String"
                    },
                    {
                      "name": "life_sustain_support_flag",
                      "type": "String"
                    },
                    {
                      "name": "medical_specialty",
                      "type": "String"
                    },
                    {
                      "name": "product_code",
                      "type": "String"
                    },
                    {
                      "name": "regulation_number",
                      "type": "String"
                    },
                    {
                      "name": "review_code",
                      "type": "String"
                    },
                    {
                      "name": "submission_type_id",
                      "type": "String"
                    },
                    {
                      "name": "openfda.fei_number",
                      "type": "String"
                    },
                    {
                      "name": "openfda.registration_number",
                      "type": "String"
                    }
                  ]
                },
                {
                  "name": "Recall Enforcement Reports",
                  "uri": "/device/clasification.json",
                  "search_fields": [
                    {
                      "name": "center_classification_date",
                      "type": "String"
                    },
                    {
                      "name": "country",
                      "type": "String"
                    },
                    {
                      "name": "distribution_pattern",
                      "type": "String"
                    },
                    {
                      "name": "event_id",
                      "type": "String"
                    },
                    {
                      "name": "product_code",
                      "type": "String"
                    },
                    {
                      "name": "product_quantity",
                      "type": "String"
                    },
                    {
                      "name": "recall_initiation_date",
                      "type": "String"
                    },
                    {
                      "name": "recall_number",
                      "type": "String"
                    },
                    {
                      "name": "report_date",
                      "type": "String"
                    },
                    {
                      "name": "status",
                      "type": "String"
                    },
                    {
                      "name": "termination_date",
                      "type": "String"
                    },
                    {
                      "name": "voluntary_mandated",
                      "type": "String"
                    },
                    {
                      "name": "openfda.application_number",
                      "type": "String"
                    },
                    {
                      "name": "openfda.nui",
                      "type": "String"
                    },
                    {
                      "name": "openfda.original_packager_product_ndc",
                      "type": "String"
                    },
                    {
                      "name": "openfda.package_ndc",
                      "type": "String"
                    },
                    {
                      "name": "openfda.pharm_class_cs",
                      "type": "String"
                    },
                    {
                      "name": "openfda.pharm_class_cs",
                      "type": "String"
                    },
                    {
                      "name": "openfda.pharm_class_moa",
                      "type": "String"
                    },
                    {
                      "name": "openfda.pharm_class_pe",
                      "type": "String"
                    },
                    {
                      "name": "openfda.product_ndc",
                      "type": "String"
                    },
                    {
                      "name": "openfda.spl_id",
                      "type": "String"
                    }
                  ]
                },
                {
                  "name": "Adverse Events",
                  "uri": "/device/event.json",
                  "search_fields": [
                    {
                      "name": "adverse_event_flag",
                      "type": "String"
                    },
                    {
                      "name": "date_manufacturer_received",
                      "type": "String"
                    },
                    {
                      "name": "date_of_event",
                      "type": "String"
                    },
                    {
                      "name": "date_received",
                      "type": "String"
                    },
                    {
                      "name": "date_report",
                      "type": "String"
                    },
                    {
                      "name": "date_report_to_fda",
                      "type": "String"
                    },
                    {
                      "name": "event_key",
                      "type": "String"
                    },
                    {
                      "name": "manufacturer_country",
                      "type": "String"
                    },
                    {
                      "name": "mdr_report_key",
                      "type": "String"
                    },
                    {
                      "name": "report_date",
                      "type": "String"
                    },
                    {
                      "name": "report_number",
                      "type": "String"
                    },
                    {
                      "name": "report_to_fda",
                      "type": "String"
                    }
                  ]
                },
                {
                  "name": "Pre-market Approval",
                  "uri": "/device/pma.json",
                  "search_fields": [
                    {
                      "name": "advisory_committee",
                      "type": "String"
                    },
                    {
                      "name": "date_received",
                      "type": "String"
                    },
                    {
                      "name": "decision_code",
                      "type": "String"
                    },
                    {
                      "name": "docket_number",
                      "type": "String"
                    },
                    {
                      "name": "pma_number",
                      "type": "String"
                    },
                    {
                      "name": "product_code",
                      "type": "String"
                    },
                    {
                      "name": "supplement_number",
                      "type": "String"
                    },
                    {
                      "name": "openfda.fei_number",
                      "type": "String"
                    },
                    {
                      "name": "openfda.registration_number",
                      "type": "String"
                    },
                    {
                      "name": "openfda.regulation_number",
                      "type": "String"
                    }
                  ]
                },
                {
                  "name": "Recalls",
                  "uri": "/device/recall.json",
                  "search_fields": [
                    {
                      "name": "firm_fei_number",
                      "type": "String"
                    },
                    {
                      "name": "k_numbers",
                      "type": "String"
                    },
                    {
                      "name": "product_code",
                      "type": "String"
                    },
                    {
                      "name": "product_res_number",
                      "type": "String"
                    },
                    {
                      "name": "res_event_number",
                      "type": "String"
                    },
                    {
                      "name": "openfda.fei_number",
                      "type": "String"
                    },
                    {
                      "name": "openfda.registration_number",
                      "type": "String"
                    },
                    {
                      "name": "openfda.regulation_number",
                      "type": "String"
                    }
                  ]
                },
                {
                  "name": "Registrations and Listings",
                  "uri": "/device/registrationlisting.json",
                  "search_fields": [
                    {
                      "name": "k_number",
                      "type": "String"
                    },
                    {
                      "name": "pma_number",
                      "type": "String"
                    },
                    {
                      "name": "registration.fei_number",
                      "type": "String"
                    },
                    {
                      "name": "registration.iso_country_code",
                      "type": "String"
                    },
                    {
                      "name": "registration.reg_expiry_date_year",
                      "type": "String"
                    },
                    {
                      "name": "registration.registration_number",
                      "type": "String"
                    }
                  ]
                },
                {
                  "name": "Unique Device Identifier",
                  "uri": "/device/udi.json",
                  "search_fields": [
                    {
                      "name": "catalog_number",
                      "type": "String"
                    },
                    {
                      "name": "device_count_in_base_package",
                      "type": "int"
                    },
                    {
                      "name": "public_version_number",
                      "type": "String"
                    },
                    {
                      "name": "record_key",
                      "type": "String"
                    },
                    {
                      "name": "record_status",
                      "type": "String"
                    },
                    {
                      "name": "version_or_model_number",
                      "type": "String"
                    }
                  ]
                }
              ]
            },
            {
              "api_name": "Food API Endpoints",
              "end_points": [
                {
                  "name": "Recall Enforcement Reports",
                  "uri": "/food/enforcement.json",
                  "search_fields": [
                    {
                      "name": "center_classification_date",
                      "type": "String"
                    },
                    {
                      "name": "country",
                      "type": "String"
                    },
                    {
                      "name": "event_id",
                      "type": "String"
                    },
                    {
                      "name": "product_code",
                      "type": "String"
                    },
                    {
                      "name": "recall_initiation_date",
                      "type": "String"
                    },
                    {
                      "name": "recall_number",
                      "type": "String"
                    },
                    {
                      "name": "status",
                      "type": "String"
                    },
                    {
                      "name": "termination_date",
                      "type": "String"
                    },
                    {
                      "name": "openfda.application_number",
                      "type": "String"
                    },
                    {
                      "name": "openfda.product_ndc",
                      "type": "String"
                    },
                    {
                      "name": "openfda.spl_id",
                      "type": "String"
                    },
                    {
                      "name": "openfda.unii",
                      "type": "String"
                    },
                    {
                      "name": "openfda.upc",
                      "type": "String"
                    }
                  ]
                },
                {
                  "name": "Adverse Events",
                  "uri": "/food/event.json",
                  "search_fields": [
                    {
                      "name": "date_created",
                      "type": "String"
                    },
                    {
                      "name": "date_started",
                      "type": "String"
                    },
                    {
                      "name": "report_number",
                      "type": "String"
                    },
                    {
                      "name": "products",
                      "type": "String"
                    },
                    {
                      "name": "outcomes",
                      "type": "String"
                    }
                  ]
                }
              ]
            },
            {
              "api_name": "Other API Endpoints",
              "end_points": [
                {
                  "name": "NSDE",
                  "uri": "/other/nsde.json",
                  "search_fields": [
                    {
                      "name": "package_ndc",
                      "type": "String"
                    },
                    {
                      "name": "package_ndc11",
                      "type": "String"
                    },
                    {
                      "name": "proprietary_name",
                      "type": "String"
                    },
                    {
                      "name": "product_type",
                      "type": "String"
                    },
                    {
                      "name": "marketing_start_date",
                      "type": "String"
                    },
                    {
                      "name": "marketing_end_date",
                      "type": "String"
                    },
                    {
                      "name": "billing_unit",
                      "type": "String"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    };
    this.data.regulatories.forEach((eachItem) => {
      this.regulatories.push({ "label": eachItem.regulatory, "value": eachItem.regulatory })
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
    this.endpointsArray.forEach((endpointAPI) => {
      if (endpointAPI.name === selectedendpoint) {
        this.searchfields = endpointAPI["search_fields"];
        this.apiUrl = `https://api.fda.gov${endpointAPI.uri}`;
      }
    });
    // this.setapiUrl(event);
  }

  showDialog(record) {
    this.modelData = record;
    this.display = true;
  }
  queryFields(event, field) {
    this.searchablefields[field] = event.target.value;
  }
  getResponse(event) {
    let url = this.constructSearchQuery();
    this.httpService.get(url).subscribe((data: any) => {
      this.recordsArray = data.results;
      this.initialiseTableData(event);
    }, (err) => {
      this.recordsError = err.error.error.message;
    });
  }
  getData(){
    let countUrl = this.constructorCountQuery();
    this.recordsError="";
    this.recordsArray=[];
    this.showTable = true;
    this.httpService.get(countUrl).subscribe((data:any)=>{
      this.count = data.results[0].count;
    });
  }
  loadLazy(event){
    this.skip = event.first;
    this.loading = true;
    this.getResponse(event);
  }
  initialiseTableData(event){  
    this.tableHeader = this.searchfields.map(o => o["name"]);
    this.displayTableHeader = this.tableHeader.slice(0,5);
    
    if(event.sortField && event.sortOrder === 1){
      this.recordsArray.sort((a,b) => (a[event.sortField] > b[event.sortField]) ? 1 : ((b[event.sortField] > a[event.sortField]) ? -1 : 0)); 
    }
    if(event.sortField && event.sortOrder === -1){
      this.recordsArray.sort((a,b) => (b[event.sortField] > a[event.sortField]) ? 1 : ((a[event.sortField] > b[event.sortField]) ? -1 : 0)); 
    }
    this.loading = false;
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
      return url = `${this.apiUrl}?search=${searchTerms}&limit=${this.limit}&skip=${skip}`;
    }
    else {
      return url = `${this.apiUrl}?limit=${this.limit}&skip=${skip}`;
    }
    
  }

  constructorCountQuery(){
    let keys = Object.keys(this.searchablefields);
    let searchTerms = '';
    let url = '';
    if (keys) {
      keys.forEach((key, index) => {
        if (index === keys.length - 1 && this.searchablefields[key]) {
          searchTerms += `${key}:${this.searchablefields[key]}&count=${key}`;
        } else if (this.searchablefields[key]) {
          searchTerms += `${key}:${this.searchablefields[key]}+AND+`;
        }
      });
    }
    this.skip = this.skip;
    if (searchTerms) {
      return url = `${this.apiUrl}?search=${searchTerms}`;
    }
    else {
      return url = `${this.apiUrl}?count=`;
    }
    
  }
  
}

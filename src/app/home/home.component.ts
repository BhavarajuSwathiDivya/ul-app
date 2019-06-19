import { Component, OnInit, ViewChild } from '@angular/core';
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
                      "type": "float",
                      "mandatory":"true"
                    },
                    {
                      "name": "animal.age.min",
                      "type": "float",
                      "mandatory":"true"
                    },
                    {
                      "name": "animal.age.unit",
                      "type": "String",
                      "mandatory":"true"
                    },
                    {
                      "name": "animal.age.unit",
                      "type": "String",
                      "mandatory":"true"
                    },
                    {
                      "name": "administered_by",
                      "type": "String",
                      "mandatory":"true"
                    },
                    {
                      "name": "atc_vet_code",
                      "type": "String",
                      "mandatory":"false"
                    },
                    {
                      "name": "brand_name",
                      "type": "String",
                      "mandatory":"false"
                    },
                    {
                      "name": "first_exposure_date",
                      "type": "date",
                      "mandatory":"false"
                    },
                    {
                      "name": "last_exposure_date",
                      "type": "date",
                      "mandatory":"false"
                    },
                    {
                      "name": "lot_expiration",
                      "type": "date",
                      "mandatory":"false"
                    },
                    {
                      "name": "manufacturing_date",
                      "type": "date","mandatory":"false"
                    },
                    {
                      "name": "number_of_defective_items",
                      "type": "int","mandatory":"false"
                    },
                    {
                      "name": "number_of_items_returned",
                      "type": "int","mandatory":"false"
                    },
                    {
                      "name": "off_label_use",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "product_ndc",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "route",
                      "type": "String","mandatory":"false"
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
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "companynumb",
                      "type": "String",
                      "mandatory":"true"
                    },
                    {
                      "name": "occurcountry",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "primarysourcecountry",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "receiptdate",
                      "type": "String",
                      "mandatory":"true"
                    },
                    {
                      "name": "safetyreportid",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "receivedate",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "transmissiondate",
                      "type": "String","mandatory":"false"
                    }
                  ]
                },
                {
                  "name": "Product Labeling",
                  "uri": "/drug/label.json",
                  "search_fields": [
                    {
                      "name": "id",
                      "type": "String",
                      "mandatory":"true"
                    },
                    {
                      "name": "set_id",
                      "type": "String",
                      "mandatory":"false"
                    },
                    {
                      "name": "version",
                      "type": "String",
                      "mandatory":"false"
                    },
                    {
                      "name": "openfda.application_number",
                      "type": "String",
                      "mandatory":"true"
                    },
                    {
                      "name": "openfda.nui",
                      "type": "String",
                      "mandatory":"false"
                    },
                    {
                      "name": "openfda.product_ndc",
                      "type": "String",
                      "mandatory":"true"
                    },
                    {
                      "name": "openfda.product_type",
                      "type": "String",
                      "mandatory":"false"
                    },
                    {
                      "name": "openfda.spl_id",
                      "type": "String",
                      "mandatory":"false"
                    },
                    {
                      "name": "openfda.unii",
                      "type": "String",
                      "mandatory":"false"
                    },
                    {
                      "name": "openfda.upc",
                      "type": "String",
                      "mandatory":"false"
                    }
                  ]
                },
                {
                  "name": "NDC Directory",
                  "uri": "/drug/ndc.json",
                  "search_fields": [
                    {
                      "name": "product_id",
                      "type": "String",
                      "mandatory":"true"
                    },
                    {
                      "name": "spl_id",
                      "type": "String",
                      "mandatory":"false"
                    },
                    {
                      "name": "marketing_start_date",
                      "type": "String",
                      "mandatory":"false"
                    },
                    {
                      "name": "marketing_end_date",
                      "type": "String",
                      "mandatory":"false"
                    },
                    {
                      "name": "marketing_category",
                      "type": "String",
                      "mandatory":"false"
                    },
                    {
                      "name": "application_number",
                      "type": "String",
                      "mandatory":"true"
                    },
                    {
                      "name": "packaging.package_ndc",
                      "type": "String",
                      "mandatory":"false"
                    },
                    {
                      "name": "packaging.marketing_start_date",
                      "type": "String",
                      "mandatory":"false"
                    },
                    {
                      "name": "packaging.marketing_end_date",
                      "type": "String",
                      "mandatory":"false"
                    },
                    {
                      "name": "openfda.nui",
                      "type": "String",
                      "mandatory":"false"
                    },
                    {
                      "name": "openfda.spl_set_id",
                      "type": "String",
                      "mandatory":"true"
                    },
                    {
                      "name": "openfda.unii",
                      "type": "String",
                      "mandatory":"false"
                    },
                    {
                      "name": "openfda.upc",
                      "type": "String",
                      "mandatory":"false"
                    }
                  ]
                },
                {
                  "name": "Recall Enforcement Reports",
                  "uri": "/drug/enforcement.json",
                  "search_fields": [
                    {
                      "name": "code_info",
                      "type": "String",
                      "mandatory":"false"
                    },
                    {
                      "name": "country",
                      "type": "String",
                      "mandatory":"true"
                    },
                    {
                      "name": "event_id",
                      "type": "String",
                      "mandatory":"false"
                    },
                    {
                      "name": "product_code",
                      "type": "String",
                      "mandatory":"true"
                    },
                    {
                      "name": "recall_initiation_date",
                      "type": "String",
                      "mandatory":"false"
                    },
                    {
                      "name": "recall_number",
                      "type": "String",
                      "mandatory":"false"
                    },
                    {
                      "name": "recalling_firm",
                      "type": "String",
                      "mandatory":"false"
                    },
                    {
                      "name": "report_date",
                      "type": "String",
                      "mandatory":"true"
                    },
                    {
                      "name": "termination_date",
                      "type": "String",
                      "mandatory":"false"
                    },
                    {
                      "name": "termination_date",
                      "type": "String",
                      "mandatory":"false"
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
                      "type": "String",
                      "mandatory":"true"
                    },
                    {
                      "name": "applicant",
                      "type": "String",
                      "mandatory":"false"
                    },
                    {
                      "name": "clearance_type",
                      "type": "String",
                      "mandatory":"false"
                    },
                    {
                      "name": "contact",
                      "type": "String",
                      "mandatory":"false"
                    },
                    {
                      "name": "country_code",
                      "type": "String",
                      "mandatory":"true"
                    },
                    {
                      "name": "date_received",
                      "type": "String",
                      "mandatory":"false"
                    },
                    {
                      "name": "decision_code",
                      "type": "String",
                      "mandatory":"false"
                    },
                    {
                      "name": "decision_date",
                      "type": "String",
                      "mandatory":"false"
                    },
                    {
                      "name": "device_name",
                      "type": "String",
                      "mandatory":"false"
                    },
                    {
                      "name": "expedited_review_flag",
                      "type": "String",
                      "mandatory":"false"
                    },
                    {
                      "name": "k_number",
                      "type": "String",
                      "mandatory":"false"
                    },
                    {
                      "name": "product_code",
                      "type": "String",
                      "mandatory":"true"
                    },
                    {
                      "name": "review_advisory_committee",
                      "type": "String",
                      "mandatory":"false"
                    },
                    {
                      "name": "state",
                      "type": "String",
                      "mandatory":"false"
                    },
                    {
                      "name": "statement_or_summary",
                      "type": "String",
                      "mandatory":"false"
                    },
                    {
                      "name": "third_party_flag",
                      "type": "String",
                      "mandatory":"false"
                    },
                    {
                      "name": "openfda.device_class",
                      "type": "String",
                      "mandatory":"false"
                    },
                    {
                      "name": "openfda.device_name",
                      "type": "String",
                      "mandatory":"false"
                    },
                    {
                      "name": "openfda.fei_number",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "openfda.registration_number",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "openfda.regulation_number",
                      "type": "String","mandatory":"false"
                    }
                  ]
                },
                {
                  "name": "Classification",
                  "uri": "/device/enforcement.json",
                  "search_fields": [
                    {
                      "name": "device_class",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "device_name",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "gmp_exempt_flag",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "implant_flag",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "life_sustain_support_flag",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "medical_specialty",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "product_code",
                      "type": "String",
                      "mandatory":"true"
                    },
                    {
                      "name": "regulation_number",
                      "type": "String",
                      "mandatory":"true"
                    },
                    {
                      "name": "review_code",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "submission_type_id",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "openfda.fei_number",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "openfda.registration_number",
                      "type": "String",
                      "mandatory":"true"
                    }
                  ]
                },
                {
                  "name": "Recall Enforcement Reports",
                  "uri": "/device/clasification.json",
                  "search_fields": [
                    {
                      "name": "center_classification_date",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "country",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "distribution_pattern",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "event_id",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "product_code",
                      "type": "String",
                      "mandatory":"true"
                    },
                    {
                      "name": "product_quantity",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "recall_initiation_date",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "recall_number",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "report_date",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "status",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "termination_date",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "voluntary_mandated",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "openfda.application_number",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "openfda.nui",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "openfda.original_packager_product_ndc",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "openfda.package_ndc",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "openfda.pharm_class_cs",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "openfda.pharm_class_moa",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "openfda.pharm_class_pe",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "openfda.product_ndc",
                      "type": "String",
                      "mandatory":"true"
                    },
                    {
                      "name": "openfda.spl_id",
                      "type": "String","mandatory":"false"
                    }
                  ]
                },
                {
                  "name": "Adverse Events",
                  "uri": "/device/event.json",
                  "search_fields": [
                    {
                      "name": "adverse_event_flag",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "date_manufacturer_received",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "date_of_event",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "date_received",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "date_report",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "date_report_to_fda",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "event_key",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "manufacturer_country",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "mdr_report_key",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "report_date",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "report_number",
                      "type": "String",
                      "mandatory":"true"
                    },
                    {
                      "name": "report_to_fda",
                      "type": "String","mandatory":"false"
                    }
                  ]
                },
                {
                  "name": "Pre-market Approval",
                  "uri": "/device/pma.json",
                  "search_fields": [
                    {
                      "name": "advisory_committee",
                      "type": "String",
                      "mandatory":"true"
                    },
                    {
                      "name": "date_received",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "decision_code",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "docket_number",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "pma_number",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "product_code",
                      "type": "String",
                      "mandatory":"true"
                    },
                    {
                      "name": "supplement_number",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "openfda.fei_number",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "openfda.registration_number",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "openfda.regulation_number",
                      "type": "String",
                      "mandatory":"true"
                    }
                  ]
                },
                {
                  "name": "Recalls",
                  "uri": "/device/recall.json",
                  "search_fields": [
                    {
                      "name": "firm_fei_number",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "k_numbers",
                      "type": "String",
                      "mandatory":"true"
                    },
                    {
                      "name": "product_code",
                      "type": "String",
                      "mandatory":"true"
                    },
                    {
                      "name": "product_res_number",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "res_event_number",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "openfda.fei_number",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "openfda.registration_number",
                      "type": "String",
                      "mandatory":"true"
                    },
                    {
                      "name": "openfda.regulation_number",
                      "type": "String","mandatory":"false"
                    }
                  ]
                },
                {
                  "name": "Registrations and Listings",
                  "uri": "/device/registrationlisting.json",
                  "search_fields": [
                    {
                      "name": "k_number",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "pma_number",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "registration.fei_number",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "registration.iso_country_code",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "registration.reg_expiry_date_year",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "registration.registration_number",
                      "type": "String","mandatory":"false"
                    }
                  ]
                },
                {
                  "name": "Unique Device Identifier",
                  "uri": "/device/udi.json",
                  "search_fields": [
                    {
                      "name": "catalog_number",
                      "type": "String","mandatory":"true"
                    },
                    {
                      "name": "device_count_in_base_package",
                      "type": "int","mandatory":"false"
                    },
                    {
                      "name": "public_version_number",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "record_key",
                      "type": "String","mandatory":"true"
                    },
                    {
                      "name": "record_status",
                      "type": "String","mandatory":"true"
                    },
                    {
                      "name": "version_or_model_number",
                      "type": "String","mandatory":"false"
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
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "country",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "event_id",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "product_code",
                      "type": "String","mandatory":"true"
                    },
                    {
                      "name": "recall_initiation_date",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "recall_number",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "status",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "termination_date",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "openfda.application_number",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "openfda.product_ndc",
                      "type": "String","mandatory":"true"
                    },
                    {
                      "name": "openfda.spl_id",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "openfda.unii",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "openfda.upc",
                      "type": "String","mandatory":"false"
                    }
                  ]
                },
                {
                  "name": "Adverse Events",
                  "uri": "/food/event.json",
                  "search_fields": [
                    {
                      "name": "date_created",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "date_started",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "report_number",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "products",
                      "type": "String","mandatory":"true"
                    },
                    {
                      "name": "outcomes",
                      "type": "String","mandatory":"false"
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
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "package_ndc11",
                      "type": "String","mandatory":"true"
                    },
                    {
                      "name": "proprietary_name",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "product_type",
                      "type": "String","mandatory":"true"
                    },
                    {
                      "name": "marketing_start_date",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "marketing_end_date",
                      "type": "String","mandatory":"false"
                    },
                    {
                      "name": "billing_unit",
                      "type": "String","mandatory":"false"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
    // this.httpService.get(`${apiUrl}/auth/filters`).subscribe((data: any) => {
    //     this.data = data;
    //     this.data.regulatories.forEach((eachItem) => {
    //       this.regulatories.push({ "label": eachItem.regulatory, "value": eachItem.regulatory })
    //     });
    //   }, (err) => {
    //     this.recordsError = err.error.error.message;
    // });
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
      this.recordsError = err.error.error.message;
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
      return url = `https://api.fda.gov${this.regulatoryApiUrl}?search=${searchTerms}&limit=${this.limit}&skip=${skip}`;
    }
    else {
      return url = `https://api.fda.gov${this.regulatoryApiUrl}?limit=${this.limit}&skip=${skip}`;
    }
    
  }
  
}

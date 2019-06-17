import { Component } from '@angular/core';
import { isArray } from 'util';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  display: boolean = false;
  showResult: boolean = false;
  showResult1: boolean = false;
  selectedfield: '';
  searchfields = {
    "510k": {
      "k_number": "",
      "clearance_type": [{
        "traditional": "Traditional"
      },
      {
        "special": "Special"
      },
      {
        "post": "Post"
      },
      {
        "nse": "NSE"
      },
      {
        "direct": "Direct"
      },
      {
        "track": "Track"
      },
      {
        "dual": "Dual"
      }
      ],
      "zip_code": "",
      "decision_code": [{
        "SEKD": "Substantially Equivalent - Kit with Drugs"
      },
      {
        "SESD": "Substantially Equivalent with Drug"
      },
      {
        "SESE": "Substantially Equivalent"
      },
      {
        "SESK": "Substantially Equivalent - Kit"
      },
      {
        "SESP": "Substantially Equivalent - Postmarket Surveillance Required"
      },
      {
        "SESU": "Substantially Equivalent - With Limitations"
      },
      {
        "SESR": "Potential Recal"
      }
      ],
      "decision_description": "",
      "statement_or_summary": "",
      "date_received": "",
      "third_party_flag": "",
      "state": "",
      "address_1": "",
      "address_2": "",
      "contact": "",
      "country_code": "",
      "city": "",
      "review_advisory_committee": "",
      "advisory_committee": "",
      "advisory_committee_description": [{
        "AN": "Anesthesiology"
      },
      {
        "CV": "Cardiovascular"
      },
      {
        "CH": "Clinical Chemistry"
      },
      {
        "DE": "Dental"
      },
      {
        "EN": "Ear, Nose, Throat"
      },
      {
        "GU": "Gastroenterology, Urology"
      },
      {
        "HO": "General Hospital"
      },
      {
        "HE": "Hematology"
      },
      {
        "IM": "Immunology"
      },
      {
        "MI": "Microbiology"
      },
      {
        "NE": "Neurology"
      },
      {
        "OB": "Obstetrics/Gynecology"
      },
      {
        "OP": "Ophthalmic"
      },
      {
        "OR": "Orthopedic"
      },
      {
        "PA": "Pathology"
      },
      {
        "PM": "Physical Medicine"
      },
      {
        "RA": "Radiology"
      },
      {
        "SU": "General, Plastic Surgery"
      },
      {
        "TX": "Clinical Toxicology"
      }
      ],
      "device_name": "",
      "product_code": "",
      "postal_code": "",
      "applicant": "",
      "decision_date": "",
      "device_class": [{
        "1": "Class I (low to moderate risk): general controls"
      },
      {
        "2": "Class II (moderate to high risk): general controls and special controls"
      },
      {
        "3": "Class III (high risk): general controls and Premarket Approval (PMA)"
      },
      {
        "U": "Unclassified N : Not classified"
      },
      {
        "F": "HDE"
      }
      ]
    }
  };
  showDialog() {
    this.display = true;
  }
  constructor() {
    console.log(this.searchfields["510k"]);
  }
}

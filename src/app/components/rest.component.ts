import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-rest',
  templateUrl: './rest.component.html',
  styles: []
})
export class RestComponent implements OnInit {

  show: boolean = true;
  nuevo: boolean = false;
  bps: any[] = [];
  countries: any[] = [];
  priceList: any[] = [];

  bp: any = {
    _entityName: "BusinessPartner",
    searchKey: "",
    name: "",
    taxID: null,
    businessPartnerCategory: "54B63E01067E4C1C82126B81F0F7BA68",
    priceList: null
  };

  location: any = {
    _entityName: "Location",
    addressLine1: "",
    postalCode: "",
    country: "",
    cityName: ""
  };

  BPLocation: any = {
    _entityName: "BusinessPartnerLocation",
    name: "",
    businessPartner: "",
    locationAddress: ""
  };


  constructor( private rest: RestService ) { }

  // sorting section
  key: string = 'name';
  reverse: boolean = false;
  p: number = 1;
  qtyItems: number = 5;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

  ngOnInit() {

    this.rest.getAll("BusinessPartner", "")
      .subscribe( (response: any) => this.bps = response.response.data );

    this.rest.getAll("Country", "?_orderBy=name")
      .subscribe( (response:any) => this.countries = response.response.data );

    this.rest.getAll("PricingPriceList", "?_orderBy=name")
      .subscribe( (response:any) => this.priceList = response.response.data );

  }

  refresh() {
    this.rest.getAll("BusinessPartner", "")
      .subscribe( (response: any) => this.bps = response.response.data );
  }

  save() {
    this.BPLocation.name = this.location.addressLine1;

    let bp: any[] = [this.bp];
    this.rest.add( bp )  // guarda el businesspartner
        .then( data => {
          if(data.response.status == 0) {
            this.BPLocation.businessPartner = data.response.data["0"].id;
            let location: any[] = [this.location];
            this.rest.add( location )  // guarda la direccion
              .then( data => {
                  if(data.response.status == 0) {
                    this.BPLocation.locationAddress = data.response.data["0"].id;
                    let bpl: any[] = [this.BPLocation];
                    this.rest.add( bpl ) // guarda el BusinessPartnerLocation
                      .then(data => {
                          if(data.response.status == 0) {
                            this.refresh();
                       }})
                       .catch( error => console.error(error) );
                  }
              })
              .catch( error => console.error(error) );
          }

         })
         .catch( error => console.error(error) );
  }


  delete(bp: any, idx:number) {
    this.rest.delete("BusinessPartner", bp.id).subscribe( (data: any) => {
          if(data.response.status == 0) {
            this.refresh();
          }
        },
        error => console.error(error));
  }

}

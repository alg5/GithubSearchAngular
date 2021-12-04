import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CryptocurrencyData, SortOptionsEnum, ValueText } from 'src/app/cryptocurrency/models';
import { CryptocurrencyService } from 'src/app/core/services/cryptocurrency.service';
export const MAX_WIDTH_MOBILE = 760;
@Component({
  selector: 'app-cryptocurrency',
  templateUrl: './cryptocurrency.component.html',
  styleUrls: ['./cryptocurrency.component.css']
})

export class CryptocurrencyComponent implements OnInit {

  isMobile:boolean;
  isMobileOld:boolean;
  lastTime: string;
  lastDate:string;

  rForm: FormGroup;
  rowsLimit: number = 20;
  sortOption: SortOptionsEnum = SortOptionsEnum.ByMarketCap;
  maxRows =  500;

  page: number = 1;
  pageSize: number = 20;

  breakpoint :number;
  loading:boolean;
 
  criptoDataList: Array< CryptocurrencyData>;
  criptoDataListFiltered: Array< CryptocurrencyData>;

  sortOptions: Array<ValueText>;

  SortOptionsEnum = SortOptionsEnum;
  
  translations = {
    WelcomeText : "Welcome to Cryptocurrency  "
    , LastVisit: " LastVisit "
    , LimitText: "Enter rows limit" 
    , SortOptionText: "Choose sort option"    
    , ColName: "Name" 
    , ColSymbol: "Symbol"
    , ColPrice: "Price"
    , ColMarketCap: "MarketCap"
    , ErrorMessageRequares: "This field is mandatory"
    , ErrorMessageRowsMax: `Number of rows must be less or equal ${this.maxRows}`
  }

  constructor(private datePipe: DatePipe
              , private fb: FormBuilder
             , private cryptocurrencyService : CryptocurrencyService
    ) 
    { }

  ngOnInit(): void {
    this.isMobile = this.isMobileOld = window.innerWidth <= MAX_WIDTH_MOBILE;
    console.log("ngOnInit:isMobile", this.isMobile);
    const now = Date();
    this.lastDate = this.datePipe.transform(now, 'dd/MM/yyyy');
    this.lastTime = this.datePipe.transform(now, 'shortTime');
    this.rForm = this.fb.group({
      'rowsLimit' : [null, [Validators.required, Validators.max(this.maxRows)]],
      'sortOption': [null, Validators.required],

    });
    this.fillSortOptions();
  }
  getData()
  {
     if (this.rForm.valid){
       this.loading = true;
        this.getDataFromApi();
    }
    
  }
  fillSortOptions(){
    this.sortOptions = new Array<ValueText>();
    let item: ValueText = {Value: SortOptionsEnum.ByPrice, Text: "By Price"};
    this.sortOptions.push(item);
    item = {Value: SortOptionsEnum.ByMarketCap, Text: "By MarketCap"};
    this.sortOptions.push(item);

  }
  getDataFromApi(){
    let rowsLimit = this.rForm.get('rowsLimit').value;
     
    this.cryptocurrencyService.getCurrencyData( rowsLimit)
      .subscribe(
              data => {
                  this.loading = false;
                  if(!data) {
                    //TODO
                    return;
                  }
                  this.criptoDataList = data;
                  // console.log("criptoDataList", this.criptoDataList);
                  this.filteredData();
               },
              error => {
                //TODO
    });
  }
  onSortOptionChange($event)
  {
    this.page = 1;
    this.sortOption = this.rForm.get('sortOption').value;
    if (this.criptoDataList)
      this.filteredData();
  }
  filteredData(){
    
    this.criptoDataListFiltered = this.criptoDataList;
    //sorting desc
    let sortOption = this.rForm.get('sortOption').value;
    if (sortOption == SortOptionsEnum.ByPrice){
      this.criptoDataListFiltered = this.criptoDataList.sort(function (a, b) {
        return b.metrics.market_data.price_usd - a.metrics.market_data.price_usd;
      });
    }
    else{
      this.criptoDataListFiltered = this.criptoDataList.sort(function (a, b) {
        return b.metrics.marketcap.current_marketcap_usd - a.metrics.marketcap.current_marketcap_usd;
      });      
    }
    //paging
    if (!this.isMobile){
      this.criptoDataListFiltered = this.criptoDataListFiltered.slice((this.page-1) * this.pageSize, this. page * this.pageSize);
    }


  }
  
  
  onPageChanged($event){
    // console.log("onPageChanged", $event);
    if (this.criptoDataList)
    this.filteredData();
  }
  onResize(event) {
    this.isMobile = event.target.innerWidth <= MAX_WIDTH_MOBILE;
    console.log("onResize:isMobile", this.isMobile);
    if (this.isMobile != this.isMobileOld){
      this.isMobileOld = this.isMobile;
      this.filteredData();
    }
  }


}

import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[onlyNumericInteger]'
})
export class OnlyNumericIntegerDirective {

  constructor() { }
  
  @HostListener("keypress", ['$event']) keypress(evt) {

    let key = evt.key;
   
    switch (evt.keyCode) {
      case 8:  // Backspace
      case 9:  // Tab
      case 13: // Enter
      case 37: // Left
      case 38: // Up
      case 39: // Right
      case 40: // Down
      return;
      // default:
      
      }
        //let regexp = /^[א-ת\s]+$/g;
        let regexp = /^(0|[1-9][0-9]*)$/g;
      let res = regexp.test(key);
      if (!res) {
          evt.preventDefault();
       }
    
  }
  @HostListener("paste", ['$event']) paste(evt) {
    
   let clipboardData = evt.clipboardData;
   let pastedData = clipboardData.getData('Text');
   if (pastedData.match(/[^\d]/)) {
      evt.preventDefault();
    }
  }
  // @HostListener("change", ['$event']) change(evt) {
  //   console.log("change", evt, evt.target.value);
  //   let pastedData = evt.target.value;
  //  if (pastedData.match(/[^\d]/)) {
  //     evt.preventDefault();
  //   }
  //  }
}

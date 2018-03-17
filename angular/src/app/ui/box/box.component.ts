import { Component, Output, Input, HostBinding } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'company-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss'],
  host: {
    '[style.flex-shrink]': 'getFlexShriknStyle()',
    '[style.flex-grow]': 'getFlexGrowStyle()',
    '[style.width]': 'getWidthStyle()',
    '[style.margin-right]': 'getMarginRightStyle()',
  }
})
export class BoxComponent {

  @Input() mr?: number;
  @Input() width?: 'min' | 'max' | number;

  constructor(private sanitizer: DomSanitizer) {
  }

  // I'd prefer to write it like this to keep all related styles together rather than the below methods
  // I'd also prefer to not use inline styles
  // getWidthStyles(): string {
  //   if (this.width === 'min') {
  //     return 'flex-shrink: 0;';
  //   } else if (this.width === 'max') {
  //     return 'flex-grow: 1;';
  //   } else if (typeof this.width === 'number') {
  //     return `width: ${this.width * 100}%`;
  //   } else {
  //     return '';
  //   }
  // }
  // @HostBinding('style') getStyles(): {} {
  //   return this.getWidthStyles();
  // }


  getFlexShriknStyle(): SafeStyle {
    if (this.width === 'min') {
      return this.sanitizer.bypassSecurityTrustStyle('0');
    } else {
      return this.sanitizer.bypassSecurityTrustStyle('');
    }
  }

  getFlexGrowStyle(): SafeStyle {
    if (this.width === 'max') {
      return '1';
    } else {
      return '';
    }
  }

  getWidthStyle() {
    if (typeof this.width === 'number') {
      return `${this.width * 100}%`;
    } else {
      return '';
    }
  }

  getMarginRightStyle() {
    if (this.mr) {
      return `${this.mr}em`;
    }
  }

}

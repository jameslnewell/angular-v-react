import { Component, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'company-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {

  @Input() placeholder?: string;
  @Output() change: EventEmitter<string> = new EventEmitter();
  @ViewChild('input') input: ElementRef;

  focus() {
    return this.input.nativeElement.focus();
  }

  select() {
    return this.input.nativeElement.select();
  }

  handleChange(event: KeyboardEvent) {
    event.stopPropagation();
    this.change.emit(this.input.nativeElement.value);
  }

}

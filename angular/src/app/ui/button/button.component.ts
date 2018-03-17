import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'company-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  @Input() isLoading: boolean;

  @Output() click: EventEmitter<void> = new EventEmitter();

  handleClick(event: MouseEvent) {
    event.stopPropagation();
    this.click.emit();
  }

}

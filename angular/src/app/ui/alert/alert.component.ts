import { Component, Input } from '@angular/core';

@Component({
  selector: 'Company-Alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  @Input() type: string;
}

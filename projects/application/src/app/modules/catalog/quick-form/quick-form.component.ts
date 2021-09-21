import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { Car } from '../catalog.data';

@Component({
  selector: 'app-quick-form',
  templateUrl: 'quick-form.html',
  host: { class: 'layoutPanel panelResizable west' },
  encapsulation: ViewEncapsulation.None
})

export class QuickFormComponent implements OnInit {
  @Input() mark: string;
  @Input() car: Car;
  @Input() trAnimation: boolean;
  @Output() flagQuickForm: EventEmitter<boolean> = new EventEmitter<boolean>();

  closeQuickForm() {
    this.flagQuickForm.emit(false);
  }

  ngOnInit() {
  }
}

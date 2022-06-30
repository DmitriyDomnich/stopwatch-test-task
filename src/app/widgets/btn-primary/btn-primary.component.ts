import { Component, HostBinding } from '@angular/core';

@Component({
  selector: '.btn-primary',
  templateUrl: './btn-primary.component.html',
  styles: [],
})
export class BtnPrimaryComponent {
  @HostBinding('class') class =
    'py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75';
}
